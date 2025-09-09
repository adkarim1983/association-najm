import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db/mongoose.js';
import User from '../../../../lib/db/models/User.js';
import Project from '../../../../lib/db/models/Project.js';
import Contact from '../../../../lib/db/models/Contact.js';
import { authMiddleware } from '../../../../lib/auth/middleware.js';

// GET /api/admin/dashboard - Get dashboard statistics (admin/moderator only)
export async function GET(request) {
  try {
    // Authenticate user (admin/moderator only)
    const { user } = await authMiddleware(request);
    
    if (!['admin', 'moderator'].includes(user.role)) {
      return NextResponse.json(
        { error: 'Access forbidden', message: 'Admin or moderator role required' },
        { status: 403 }
      );
    }

    // Connect to database
    await connectDB();

    // Statistiques des utilisateurs
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const adminUsers = await User.countDocuments({ role: 'admin' });
    const moderatorUsers = await User.countDocuments({ role: 'moderator' });

    // Statistiques des projets
    const totalProjects = await Project.countDocuments();
    const activeProjects = await Project.countDocuments({ status: 'active' });
    const featuredProjects = await Project.countDocuments({ featured: true });

    // Statistiques des contacts
    const totalContacts = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: 'new' });
    const repliedContacts = await Contact.countDocuments({ status: 'replied' });
    const spamContacts = await Contact.countDocuments({ isSpam: true });

    // Activité récente (derniers 7 jours)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const recentUsers = await User.countDocuments({ createdAt: { $gte: weekAgo } });
    const recentProjects = await Project.countDocuments({ createdAt: { $gte: weekAgo } });
    const recentContacts = await Contact.countDocuments({ createdAt: { $gte: weekAgo } });

    // Projets les plus vus
    const topProjects = await Project.find()
      .sort({ 'metadata.views': -1 })
      .limit(5)
      .select('name metadata.views metadata.likes');

    // Contacts par priorité
    const contactsByPriority = await Contact.aggregate([
      { $match: { isSpam: false } },
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);

    // Contacts par catégorie
    const contactsByCategory = await Contact.aggregate([
      { $match: { isSpam: false } },
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    return NextResponse.json({
      users: {
        total: totalUsers,
        active: activeUsers,
        admins: adminUsers,
        moderators: moderatorUsers,
        recent: recentUsers
      },
      projects: {
        total: totalProjects,
        active: activeProjects,
        featured: featuredProjects,
        recent: recentProjects,
        topViewed: topProjects
      },
      contacts: {
        total: totalContacts,
        new: newContacts,
        replied: repliedContacts,
        spam: spamContacts,
        recent: recentContacts,
        byPriority: contactsByPriority,
        byCategory: contactsByCategory
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
