import { NextResponse } from 'next/server';
import Joi from 'joi';
import connectDB from '../../../../../../lib/db/mongoose.js';
import Project from '../../../../../../lib/db/models/Project.js';
import { authMiddleware } from '../../../../../../lib/auth/middleware.js';

const statusSchema = Joi.object({
  status: Joi.string().valid('draft', 'active', 'completed', 'cancelled').required()
});

// PUT /api/admin/projects/[id]/status - Update project status (admin/moderator only)
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
    
    // Validate input
    const { error, value } = statusSchema.validate(body);
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

    // Update project status
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { 
        status: value.status,
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
      message: `Project status updated to ${value.status}`,
      project: updatedProject
    });

  } catch (error) {
    console.error('Error updating project status:', error);
    
    if (error.name === 'CastError') {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to update project status',
        message: error.message
      },
      { status: 500 }
    );
  }
}
