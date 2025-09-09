import { NextResponse } from 'next/server';
import Joi from 'joi';
import connectDB from '../../../lib/db/mongoose.js';
import Contact from '../../../lib/db/models/Contact.js';
import { getClientIP } from '../../../lib/auth/middleware.js';
import { sendContactNotification, sendUserConfirmation } from '../../../lib/email/notifications.js';

const contactSchema = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().max(20).optional(),
  subject: Joi.string().max(200).required(),
  message: Joi.string().max(2000).required(),
  category: Joi.string().valid('general', 'project', 'partnership', 'volunteer', 'complaint', 'suggestion').default('general'),
  language: Joi.string().valid('fr', 'en', 'ar').default('fr')
});

// GET /api/contact - Get all contacts (admin only)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const category = searchParams.get('category');

    // Connect to database
    await connectDB();

    const query = { isSpam: false };
    
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (category) query.category = category;

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate('repliedBy', 'firstName lastName email');

    const total = await Contact.countDocuments(query);

    return NextResponse.json({
      contacts,
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
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch contacts',
        message: error.message
      },
      { status: 500 }
    );
  }
}

// POST /api/contact - Create new contact message
export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate input
    const { error, value } = contactSchema.validate(body);
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

    // Get client info
    const clientIP = getClientIP(request);
    const userAgent = request.headers.get('user-agent') || '';

    // Create new contact
    const contact = new Contact({
      ...value,
      ipAddress: clientIP,
      userAgent,
      source: 'website'
    });

    await contact.save();

    // Send email notifications (async, don't wait for completion)
    if (!contact.isSpam) {
      // Send admin notification
      sendContactNotification(contact).catch(error => {
        console.error('Failed to send admin notification:', error);
      });
      
      // Send user confirmation
      sendUserConfirmation(contact).catch(error => {
        console.error('Failed to send user confirmation:', error);
      });
    }

    return NextResponse.json({
      message: 'Message sent successfully',
      contact: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        status: contact.status,
        createdAt: contact.createdAt
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      {
        error: 'Failed to send message',
        message: error.message
      },
      { status: 500 }
    );
  }
}
