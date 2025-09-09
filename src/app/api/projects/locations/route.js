import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db/mongoose.js';
import Project from '../../../../lib/db/models/Project.js';

// GET /api/projects/locations - Get all unique locations
export async function GET(request) {
  try {
    // Connect to database
    await connectDB();
    
    // Get unique locations from active projects
    const locations = await Project.distinct('location', { status: 'active' });
    
    // Format locations with counts
    const locationsWithCounts = await Promise.all(
      locations.map(async (location) => {
        const count = await Project.countDocuments({ 
          location, 
          status: 'active' 
        });
        return {
          key: location,
          label: location,
          count
        };
      })
    );
    
    // Sort by count (descending)
    locationsWithCounts.sort((a, b) => b.count - a.count);
    
    return NextResponse.json({
      locations: locationsWithCounts,
      total: locationsWithCounts.length
    });

  } catch (error) {
    console.error('Error fetching locations:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch locations',
        message: error.message
      },
      { status: 500 }
    );
  }
}
