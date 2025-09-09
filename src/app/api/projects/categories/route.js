import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db/mongoose.js';
import Project from '../../../../lib/db/models/Project.js';

// GET /api/projects/categories - Get all unique categories
export async function GET(request) {
  try {
    // Connect to database
    await connectDB();
    
    // Get unique categories from active projects
    const categories = await Project.distinct('category', { status: 'active' });
    
    // Format categories with counts
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const count = await Project.countDocuments({ 
          category, 
          status: 'active' 
        });
        return {
          key: category,
          label: category,
          count
        };
      })
    );
    
    // Sort by count (descending)
    categoriesWithCounts.sort((a, b) => b.count - a.count);
    
    return NextResponse.json({
      categories: categoriesWithCounts,
      total: categoriesWithCounts.length
    });

  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch categories',
        message: error.message
      },
      { status: 500 }
    );
  }
}
