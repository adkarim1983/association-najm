import { NextResponse } from 'next/server';
import Joi from 'joi';
import connectDB from '../../../../lib/db/mongoose.js';
import User from '../../../../lib/db/models/User.js';
import { generateAccessToken, generateRefreshToken } from '../../../../lib/auth/jwt.js';
import { rateLimit, getClientIP } from '../../../../lib/auth/middleware.js';

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().max(50).required(),
  lastName: Joi.string().max(50).required()
});

// Rate limiter for registration attempts
const registerRateLimit = rateLimit(60 * 60 * 1000, 3); // 3 attempts per hour

export async function POST(request) {
  try {
    const clientIP = getClientIP(request);
    
    // Apply rate limiting
    try {
      registerRateLimit(clientIP);
    } catch (rateLimitError) {
      return NextResponse.json(
        { error: 'Too many attempts', message: rateLimitError.message },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    
    // Validate input
    const { error, value } = registerSchema.validate(body);
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

    const { username, email, password, firstName, lastName } = value;

    // Connect to database
    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username }
      ]
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error: 'User already exists',
          message: existingUser.email === email.toLowerCase() 
            ? 'Email is already registered' 
            : 'Username is already taken'
        },
        { status: 409 }
      );
    }

    // Create new user
    const user = new User({
      username,
      email: email.toLowerCase(),
      password,
      firstName,
      lastName
    });

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
      message: 'User registered successfully',
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
        accessToken,
        refreshToken,
        expiresIn: process.env.JWT_ACCESS_EXPIRY || '15m'
      }
    }, { status: 201 });

    // Set HTTP-only cookies
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
    console.error('Registration error:', error);
    
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return NextResponse.json(
        {
          error: 'Duplicate field',
          message: `${field} is already taken`
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        error: 'Registration failed',
        message: 'Internal server error'
      },
      { status: 500 }
    );
  }
}
