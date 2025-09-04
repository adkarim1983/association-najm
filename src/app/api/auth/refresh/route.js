import { NextResponse } from 'next/server';
import Joi from 'joi';
import connectDB from '../../../../lib/db/mongoose.js';
import User from '../../../../lib/db/models/User.js';
import { generateAccessToken, verifyRefreshToken } from '../../../../lib/auth/jwt.js';

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required()
});

export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Also check cookies for refresh token
    const cookieRefreshToken = request.cookies.get('najm_refresh_token')?.value;
    const refreshToken = body.refreshToken || cookieRefreshToken;

    // Validate input
    const { error } = refreshTokenSchema.validate({ refreshToken });
    if (error) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          message: 'Refresh token is required'
        },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Verify refresh token
    let decoded;
    try {
      decoded = await verifyRefreshToken(refreshToken);
    } catch (jwtError) {
      return NextResponse.json(
        {
          error: 'Invalid token',
          message: 'Refresh token is invalid or expired'
        },
        { status: 401 }
      );
    }

    // Find user and check if refresh token exists
    const user = await User.findById(decoded.id);
    if (!user || !user.isActive) {
      return NextResponse.json(
        {
          error: 'User not found',
          message: 'User associated with token not found or inactive'
        },
        { status: 401 }
      );
    }

    // Check if refresh token exists in user's tokens
    const tokenExists = user.refreshTokens.some(
      tokenObj => tokenObj.token === refreshToken
    );

    if (!tokenExists) {
      return NextResponse.json(
        {
          error: 'Invalid token',
          message: 'Refresh token not found or already used'
        },
        { status: 401 }
      );
    }

    // Generate new access token
    const newAccessToken = await generateAccessToken({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    });

    const response = NextResponse.json({
      message: 'Token refreshed successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        role: user.role,
        avatar: user.avatar,
        isEmailVerified: user.isEmailVerified
      },
      tokens: {
        accessToken: newAccessToken,
        refreshToken, // Keep the same refresh token
        expiresIn: process.env.JWT_ACCESS_EXPIRY || '15m'
      }
    });

    // Update access token cookie
    response.cookies.set('najm_access_token', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000 // 15 minutes
    });

    return response;

  } catch (error) {
    console.error('Token refresh error:', error);
    return NextResponse.json(
      {
        error: 'Token refresh failed',
        message: 'Internal server error'
      },
      { status: 500 }
    );
  }
}
