import { NextResponse } from 'next/server';
import Joi from 'joi';
import connectDB from '../../../../../../lib/db/mongoose.js';
import Contact from '../../../../../../lib/db/models/Contact.js';
import { authMiddleware } from '../../../../../../lib/auth/middleware.js';

const statusSchema = Joi.object({
  status: Joi.string().valid('new', 'read', 'replied', 'closed').required()
});

// PUT /api/admin/contacts/[id]/status - Update contact status (admin/moderator only)
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

    // Update contact status
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { 
        status: value.status,
        updatedAt: new Date(),
        updatedBy: user._id
      },
      { new: true }
    );

    if (!updatedContact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: `Contact status updated to ${value.status}`,
      contact: updatedContact
    });

  } catch (error) {
    console.error('Error updating contact status:', error);
    
    if (error.name === 'CastError') {
      return NextResponse.json(
        { error: 'Invalid contact ID' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to update contact status',
        message: error.message
      },
      { status: 500 }
    );
  }
}
