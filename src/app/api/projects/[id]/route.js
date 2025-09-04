import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db/mongoose.js';
import Project from '../../../../lib/db/models/Project.js';
import { authMiddleware, optionalAuthMiddleware } from '../../../../lib/auth/middleware.js';

// GET /api/projects/[id] - Get single project by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;

    // Connect to database
    await connectDB();

    const project = await Project.findById(id);

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
    
    // Authenticate user
    const { user } = await authMiddleware(request);
    
    // Connect to database
    await connectDB();

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
