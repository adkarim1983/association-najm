import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db/mongoose.js';
import User from '../../../../lib/db/models/User.js';
import { authMiddleware } from '../../../../lib/auth/middleware.js';

export async function POST(request) {
  try {
    // Connect to database
    await connectDB();

    // Get refresh token from body or cookies
    const body = await request.json().catch(() => ({}));
    const cookieRefreshToken = request.cookies.get('najm_refresh_token')?.value;
    const refreshToken = body.refreshToken || cookieRefreshToken;

    // Try to authenticate user to get their info
    let user = null;
    try {
      const authResult = await authMiddleware(request);
      user = authResult.user;
    } catch (authError) {
      // User might not be authenticated, but we can still try to logout with refresh token
    }

    // If we have a refresh token, remove it from the user's tokens
    if (refreshToken && user) {
      await user.removeRefreshToken(refreshToken);
    }

    // Create response
    const response = NextResponse.json({
      message: 'Logout successful'
    });

    // Clear cookies
    response.cookies.set('najm_access_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0
    });

    response.cookies.set('najm_refresh_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0
    });

    return response;

  } catch (error) {
    console.error('Logout error:', error);
    
    // Even if there's an error, clear the cookies
    const response = NextResponse.json({
      message: 'Logout completed'
    });

    response.cookies.set('najm_access_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0
    });

    response.cookies.set('najm_refresh_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0
    });

    return response;
  }
}
