import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db/mongoose.js';
import Project from '../../../../lib/db/models/Project.js';
import { authMiddleware } from '../../../../lib/auth/middleware.js';

// GET /api/admin/projects - Get all projects with pagination (admin/moderator only)
export async function GET(request) {
  try {
    // Authenticate user (admin/moderator only)
    const { user } = await authMiddleware(request);
    
    if (!['admin', 'moderator'].includes(user.role)) {
      return NextResponse.json(
        { error: 'Access forbidden', message: 'Admin or moderator role required' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') === 'asc' ? 1 : -1;
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const category = searchParams.get('category') || '';
    const featured = searchParams.get('featured');

    // Connect to database
    await connectDB();

    // Build query
    let query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }
    if (status) {
      query.status = status;
    }
    if (category) {
      query.category = category;
    }
    if (featured !== null && featured !== undefined) {
      query.featured = featured === 'true';
    }

    const skip = (page - 1) * limit;
    
    const projects = await Project.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .populate('createdBy', 'firstName lastName username');

    const total = await Project.countDocuments(query);

    return NextResponse.json({
      projects,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Error fetching projects:', error);
    
    if (error.message.includes('Authentication failed')) {
      return NextResponse.json(
        { error: 'Authentication required', message: error.message },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to fetch projects',
        message: error.message
      },
      { status: 500 }
    );
  }
}
