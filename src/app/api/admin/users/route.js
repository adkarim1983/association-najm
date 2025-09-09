import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db/mongoose.js';
import User from '../../../../lib/db/models/User.js';
import { authMiddleware } from '../../../../lib/auth/middleware.js';

// GET /api/admin/users - Get all users with pagination (admin only)
export async function GET(request) {
  try {
    // Authenticate user (admin only)
    const { user } = await authMiddleware(request);
    
    if (user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Access forbidden', message: 'Admin role required' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') === 'asc' ? 1 : -1;
    const search = searchParams.get('search') || '';
    const role = searchParams.get('role') || '';
    const isActive = searchParams.get('isActive');

    // Connect to database
    await connectDB();

    // Build query
    let query = {};
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    if (role) {
      query.role = role;
    }
    if (isActive !== null && isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    const skip = (page - 1) * limit;
    
    const users = await User.find(query)
      .select('-refreshTokens -passwordResetToken -emailVerificationToken')
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(query);

    return NextResponse.json({
      users,
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
    console.error('Error fetching users:', error);
    
    if (error.message.includes('Authentication failed')) {
      return NextResponse.json(
        { error: 'Authentication required', message: error.message },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to fetch users',
        message: error.message
      },
      { status: 500 }
    );
  }
}
