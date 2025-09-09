import { NextResponse } from 'next/server';
import Joi from 'joi';
import connectDB from '../../../../../../lib/db/mongoose.js';
import Project from '../../../../../../lib/db/models/Project.js';
import { authMiddleware } from '../../../../../../lib/auth/middleware.js';

const featuredSchema = Joi.object({
  featured: Joi.boolean().required()
});

// PUT /api/admin/projects/[id]/featured - Update project featured status (admin only)
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    
    // Authenticate user (admin only)
    const { user } = await authMiddleware(request);
    
    if (user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Access forbidden', message: 'Admin role required' },
        { status: 403 }
      );
    }

    // Parse request body
    const body = await request.json();
    
    // Validate input
    const { error, value } = featuredSchema.validate(body);
    if (error) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.details.map(detail => ({
            field: detail.path[0],
            message: detail.message
          }))
        },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Update project featured status
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { 
        featured: value.featured,
        updatedAt: new Date()
      },
      { new: true }
    ).populate('createdBy', 'firstName lastName username');

    if (!updatedProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: `Project ${value.featured ? 'featured' : 'unfeatured'} successfully`,
      project: updatedProject
    });

  } catch (error) {
    console.error('Error updating project featured status:', error);
    
    if (error.name === 'CastError') {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to update project featured status',
        message: error.message
      },
      { status: 500 }
    );
  }
}
