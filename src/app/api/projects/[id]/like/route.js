import { NextResponse } from 'next/server';
import connectDB from '../../../../../lib/db/mongoose.js';
import Project from '../../../../../lib/db/models/Project.js';

// PATCH /api/projects/[id]/like - Increment project likes
export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    
    // Connect to database
    await connectDB();
    
    // Find project and increment likes
    const project = await Project.findById(id);
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Increment likes
    await project.incrementLikes();
    
    return NextResponse.json({
      message: 'Project liked successfully',
      likes: project.metadata.likes,
      projectId: project._id
    });

  } catch (error) {
    console.error('Error liking project:', error);
    
    if (error.name === 'CastError') {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      {
        error: 'Failed to like project',
        message: error.message
      },
      { status: 500 }
    );
  }
}
