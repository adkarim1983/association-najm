import { NextResponse } from 'next/server';
import { allProjectsData, categories, locations } from '@/data/allProjectsData';

// GET /api/projects - Get all projects with filtering and pagination
export async function GET(request) {
  try {
    // Use local data with all project details
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    
    // Get query parameters
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;
    const category = searchParams.get('category');
    const location = searchParams.get('location');
    const search = searchParams.get('search');
    const address = searchParams.get('address');
    
    let filteredProjects = [...allProjectsData];
    
    // Apply filters
    if (category && category !== 'all') {
      filteredProjects = filteredProjects.filter(project => 
        project.category === category
      );
    }
    
    if (location && location !== 'all') {
      filteredProjects = filteredProjects.filter(project => 
        project.location === location
      );
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProjects = filteredProjects.filter(project => 
        project.name.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower)
      );
    }
    
    if (address) {
      const addressLower = address.toLowerCase();
      filteredProjects = filteredProjects.filter(project => 
        project.address.toLowerCase().includes(addressLower)
      );
    }

    // Calculate pagination
    const total = filteredProjects.length;
    const totalPages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;
    const paginatedProjects = filteredProjects.slice(skip, skip + limit);
    
    return NextResponse.json({
      projects: paginatedProjects,
      pagination: {
        currentPage: page,
        totalPages,
        totalProjects: total,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      categories,
      locations
    });

  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch projects',
        message: error.message
      },
      { status: 500 }
    );
  }
}
