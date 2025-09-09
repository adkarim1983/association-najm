import { NextResponse } from 'next/server';
import Joi from 'joi';
import connectDB from '../../../../lib/db/mongoose.js';
import Project from '../../../../lib/db/models/Project.js';
import { authMiddleware } from '../../../../lib/auth/middleware.js';

// Validation schema for project update
const updateProjectSchema = Joi.object({
  name: Joi.string().min(2).max(200).optional(),
  category: Joi.string().optional(),
  location: Joi.string().optional(),
  coordinates: Joi.object({
    lat: Joi.number().min(-90).max(90).required(),
    lng: Joi.number().min(-180).max(180).required()
  }).optional(),
  contact: Joi.object({
    phone: Joi.string().allow('').optional(),
    email: Joi.string().email().allow('').optional(),
    website: Joi.string().uri().allow('').optional()
  }).optional(),
  address: Joi.string().optional(),
  hours: Joi.string().allow('').optional(),
  description: Joi.string().min(10).max(2000).optional(),
  founder_info: Joi.string().allow('').optional(),
  presentation: Joi.string().allow('').optional(),
  support: Joi.string().allow('').optional(),
  products: Joi.string().allow('').optional(),
  partners: Joi.string().allow('').optional(),
  image: Joi.string().allow('').optional(),
  status: Joi.string().valid('active', 'inactive', 'pending').optional(),
  featured: Joi.boolean().optional(),
  tags: Joi.array().items(Joi.string()).optional()
});

// GET /api/projects/[id] - Get single project by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    // Connect to database
    await connectDB();
    
    // Find project by ID
    const project = await Project.findById(id)
      .populate('images.uploadedBy', 'firstName lastName');
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Increment views
    await project.incrementViews();
    
    return NextResponse.json({ project });
    
  } catch (error) {
    console.error('Error fetching project:', error);
    
    if (error.name === 'CastError') {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      {
        error: 'Failed to fetch project',
        message: error.message
      },
      { status: 500 }
    );
  }
}

// PUT /api/projects/[id] - Update project (requires authentication)
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    
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

    // Find and update project
    const project = await Project.findByIdAndUpdate(
      id,
      { ...body, updatedBy: user._id },
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
    
    if (error.message.includes('Authentication failed')) {
      return NextResponse.json(
        { error: 'Authentication required', message: error.message },
        { status: 401 }
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

// DELETE /api/projects/[id] - Delete project (requires authentication)
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    // Authenticate user
    const { user } = await authMiddleware(request);
    
    // Connect to database
    await connectDB();

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Project deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting project:', error);
    
    if (error.message.includes('Authentication failed')) {
      return NextResponse.json(
        { error: 'Authentication required', message: error.message },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to delete project',
        message: error.message
      },
      { status: 500 }
    );
  }
}
