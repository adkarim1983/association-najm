import { NextResponse } from 'next/server';
import Joi from 'joi';
import connectDB from '../../../../../../lib/db/mongoose.js';
import User from '../../../../../../lib/db/models/User.js';
import { authMiddleware } from '../../../../../../lib/auth/middleware.js';

const roleSchema = Joi.object({
  role: Joi.string().valid('user', 'moderator', 'admin').required()
});

// PUT /api/admin/users/[id]/role - Update user role (admin only)
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
    const { error, value } = roleSchema.validate(body);
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

    // Prevent self-role modification
    if (id === user._id.toString()) {
      return NextResponse.json(
        { error: 'Access forbidden', message: 'Cannot modify your own role' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Update user role
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role: value.role },
      { new: true }
    ).select('-refreshTokens -passwordResetToken -emailVerificationToken');

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: `User role updated to ${value.role}`,
      user: updatedUser
    });

  } catch (error) {
    console.error('Error updating user role:', error);
    
    if (error.name === 'CastError') {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to update user role',
        message: error.message
      },
      { status: 500 }
    );
  }
}
