import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db/mongoose.js';
import User from '../../../../lib/db/models/User.js';
import Project from '../../../../lib/db/models/Project.js';
import Contact from '../../../../lib/db/models/Contact.js';
import { authMiddleware, requireAdmin } from '../../../../lib/auth/middleware.js';

// GET /api/admin/dashboard - Get admin dashboard statistics
export async function GET(request) {
  try {
    // Authenticate and check admin role
    const { user } = await authMiddleware(request);
    requireAdmin(user);
    
    // Connect to database
    await connectDB();

    // Get statistics in parallel
    const [
      userStats,
      projectStats,
      contactStats,
      recentContacts,
      recentProjects
    ] = await Promise.all([
      // User statistics
      User.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            active: { $sum: { $cond: ['$isActive', 1, 0] } },
            admins: { $sum: { $cond: [{ $eq: ['$role', 'admin'] }, 1, 0] } },
            moderators: { $sum: { $cond: [{ $eq: ['$role', 'moderator'] }, 1, 0] } }
          }
        }
      ]),

      // Project statistics
      Project.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            active: { $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] } },
            pending: { $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] } },
            featured: { $sum: { $cond: ['$featured', 1, 0] } }
          }
        }
      ]),

      // Contact statistics
      Contact.getStats(),

      // Recent contacts
      Contact.find({ isSpam: false })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('name email subject status priority createdAt'),

      // Recent projects
      Project.find({ status: 'active' })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('name category location status createdAt')
    ]);

    return NextResponse.json({
      users: userStats[0] || { total: 0, active: 0, admins: 0, moderators: 0 },
      projects: projectStats[0] || { total: 0, active: 0, pending: 0, featured: 0 },
      contacts: contactStats,
      recent: {
        contacts: recentContacts,
        projects: recentProjects
      }
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    
    if (error.message.includes('Authentication') || error.message.includes('Admin')) {
      return NextResponse.json(
        { error: 'Access denied', message: error.message },
        { status: error.message.includes('Authentication') ? 401 : 403 }
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to fetch dashboard data',
        message: error.message
      },
      { status: 500 }
    );
  }
}
