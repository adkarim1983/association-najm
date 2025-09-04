import { NextResponse } from 'next/server';
import Joi from 'joi';
import connectDB from '../../../../lib/db/mongoose.js';
import User from '../../../../lib/db/models/User.js';
import { generateAccessToken, generateRefreshToken } from '../../../../lib/auth/jwt.js';
import { rateLimit, getClientIP } from '../../../../lib/auth/middleware.js';

const loginSchema = Joi.object({
  identifier: Joi.string().required(), // email or username
  password: Joi.string().required()
});

// Rate limiter for login attempts
const loginRateLimit = rateLimit(15 * 60 * 1000, 5); // 5 attempts per 15 minutes

export async function POST(request) {
  try {
    const clientIP = getClientIP(request);
    
    // Apply rate limiting
    try {
      loginRateLimit(clientIP);
    } catch (rateLimitError) {
      return NextResponse.json(
        { error: 'Too many attempts', message: rateLimitError.message },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    
    // Validate input
    const { error, value } = loginSchema.validate(body);
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

    const { identifier, password } = value;

    // Connect to database
    await connectDB();

    // Find user by email or username
    const user = await User.findByEmailOrUsername(identifier).select('+password');
    
    if (!user) {
      return NextResponse.json(
        {
          error: 'Authentication failed',
          message: 'Invalid credentials'
        },
        { status: 401 }
      );
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json(
        {
          error: 'Account disabled',
          message: 'Your account has been disabled. Please contact support.'
        },
        { status: 401 }
      );
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          error: 'Authentication failed',
          message: 'Invalid credentials'
        },
        { status: 401 }
      );
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate tokens
    const accessToken = await generateAccessToken({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    });
    
    const refreshToken = await generateRefreshToken({
      id: user._id,
      tokenType: 'refresh'
    });
    
    // Add refresh token to user
    await user.addRefreshToken(refreshToken);

    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        role: user.role,
        avatar: user.avatar,
        isEmailVerified: user.isEmailVerified,
        lastLogin: user.lastLogin
      },
      tokens: {
        accessToken,
        refreshToken,
        expiresIn: process.env.JWT_ACCESS_EXPIRY || '15m'
      }
    });

    // Set HTTP-only cookies for better security
    response.cookies.set('najm_access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000 // 15 minutes
    });

    response.cookies.set('najm_refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        error: 'Login failed',
        message: 'Internal server error'
      },
      { status: 500 }
    );
  }
}
