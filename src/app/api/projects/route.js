import { NextResponse } from 'next/server';
import Joi from 'joi';
import connectDB from '../../../lib/db/mongoose.js';
import Project from '../../../lib/db/models/Project.js';
import { authMiddleware } from '../../../lib/auth/middleware.js';

// Validation schema for project creation/update
const projectSchema = Joi.object({
  name: Joi.string().min(2).max(200).required(),
  category: Joi.string().required(),
  location: Joi.string().required(),
  coordinates: Joi.object({
    lat: Joi.number().min(-90).max(90).required(),
    lng: Joi.number().min(-180).max(180).required()
  }).required(),
  contact: Joi.object({
    phone: Joi.string().allow('').optional(),
    email: Joi.string().email().allow('').optional(),
    website: Joi.string().uri().allow('').optional()
  }).optional(),
  address: Joi.string().required(),
  hours: Joi.string().allow('').optional(),
  description: Joi.string().min(10).max(2000).required(),
  founder_info: Joi.string().allow('').optional(),
  presentation: Joi.string().allow('').optional(),
  support: Joi.string().allow('').optional(),
  products: Joi.string().allow('').optional(),
  partners: Joi.string().allow('').optional(),
  image: Joi.string().allow('').optional(),
  images: Joi.array().items(Joi.object({
    // Accept absolute URLs (http/https) or relative paths starting with /uploads/
    url: Joi.alternatives().try(
      Joi.string().uri(),
      Joi.string().pattern(/^\/uploads\//)
    ).required(),
    filename: Joi.string().required(),
    size: Joi.number().optional(),
    uploadedAt: Joi.date().optional(),
    uploadedBy: Joi.string().optional(),
    alt: Joi.string().optional(),
    isMain: Joi.boolean().optional()
  })).optional(),
  status: Joi.string().valid('active', 'inactive', 'pending').default('active'),
  featured: Joi.boolean().default(false),
  tags: Joi.array().items(Joi.string()).optional()
});

// GET /api/projects - Get all projects with filtering and pagination
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    
    // Get query parameters
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;
    const category = searchParams.get('category');
    const location = searchParams.get('location');
    const search = searchParams.get('search');
    const status = searchParams.get('status') || 'active';
    const featured = searchParams.get('featured');
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const radius = parseFloat(searchParams.get('radius')) || 10;

    // Connect to database
    await connectDB();

    // Build query
    const query = { status };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (location && location !== 'all') {
      query.location = location;
    }
    
    if (featured !== null && featured !== undefined) {
      query.featured = featured === 'true';
    }
    
    // Text search
    if (search) {
      query.$text = { $search: search };
    }
    
    // Nearby search
    if (lat && lng) {
      const radiusInRadians = radius / 6371; // Earth's radius in km
      query['coordinates.lat'] = {
        $gte: parseFloat(lat) - radiusInRadians,
        $lte: parseFloat(lat) + radiusInRadians
      };
      query['coordinates.lng'] = {
        $gte: parseFloat(lng) - radiusInRadians,
        $lte: parseFloat(lng) + radiusInRadians
      };
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate('images.uploadedBy', 'firstName lastName');

    const total = await Project.countDocuments(query);
    const totalPages = Math.ceil(total / limit);
    
    return NextResponse.json({
      projects,
      pagination: {
        currentPage: page,
        totalPages,
        totalProjects: total,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        itemsPerPage: limit
      }
    });

  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch projects',
        message: error.message
      },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create new project (requires authentication)
export async function POST(request) {
  try {
    // Authenticate user (admin/moderator only)
    const { user } = await authMiddleware(request);
    
    if (!['admin', 'moderator'].includes(user.role)) {
      return NextResponse.json(
        { error: 'Access forbidden', message: 'Admin or moderator role required' },
        { status: 403 }
      );
    }

    // Parse request body
    const body = await request.json();
    
    // Validate input
    const { error, value } = projectSchema.validate(body);
    if (error) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.details.map(detail => ({
            field: detail.path.join('.'),
            message: detail.message
          }))
        },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Create new project
    const project = new Project(value);
    await project.save();
    
    return NextResponse.json({
      message: 'Project created successfully',
      project
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating project:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));
      
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationErrors
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      {
        error: 'Failed to create project',
        message: error.message
      },
      { status: 500 }
    );
  }
}

// PUT /api/projects - Update project (requires authentication)
export async function PUT(request) {
  try {
    // Authenticate user (admin/moderator only)
    const { user } = await authMiddleware(request);
    
    if (!['admin', 'moderator'].includes(user.role)) {
      return NextResponse.json(
        { error: 'Access forbidden', message: 'Admin or moderator role required' },
        { status: 403 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { id, ...updateData } = body;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }

    // Validate input (excluding id)
    const { error, value } = projectSchema.validate(updateData);
    if (error) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.details.map(detail => ({
            field: detail.path.join('.'),
            message: detail.message
          }))
        },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Update project
    const project = await Project.findByIdAndUpdate(
      id,
      value,
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      message: 'Project updated successfully',
      project
    });

  } catch (error) {
    console.error('Error updating project:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));
      
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationErrors
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      {
        error: 'Failed to update project',
        message: error.message
      },
      { status: 500 }
    );
  }
}

// DELETE /api/projects - Delete project (requires authentication)
export async function DELETE(request) {
  try {
    // Authenticate user (admin only)
    const { user } = await authMiddleware(request);
    
    if (user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Access forbidden', message: 'Admin role required' },
        { status: 403 }
      );
    }

    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Delete project
    const project = await Project.findByIdAndDelete(id);
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      message: 'Project deleted successfully',
      deletedProject: { id: project._id, name: project.name }
    });

  } catch (error) {
    console.error('Error deleting project:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to delete project',
        message: error.message
      },
      { status: 500 }
    );
  }
}
