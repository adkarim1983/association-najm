import { verifyAccessToken } from './jwt.js';
import connectDB from '../db/mongoose.js';
import User from '../db/models/User.js';

// Authentication middleware for API routes
export async function authMiddleware(req) {
  try {
    let token = null;
    
    // Try to get token from Authorization header first
    const authHeader = req.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7); // Remove 'Bearer ' prefix
    }
    
    // If no token in header, try to get from cookies
    if (!token) {
      const cookies = req.headers.get('cookie');
      if (cookies) {
        const cookieArray = cookies.split(';');
        const accessTokenCookie = cookieArray.find(cookie => 
          cookie.trim().startsWith('najm_access_token=')
        );
        if (accessTokenCookie) {
          token = accessTokenCookie.split('=')[1];
        }
      }
    }
    
    if (!token) {
      throw new Error('No token provided or invalid format');
    }

    // Verify token
    const decoded = await verifyAccessToken(token);
    
    // Connect to database
    await connectDB();
    
    // Find user
    const user = await User.findById(decoded.id);
    
    if (!user) {
      throw new Error('User not found');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new Error('Account disabled');
    }

    return { user, token };

  } catch (error) {
    throw new Error(`Authentication failed: ${error.message}`);
  }
}

// Admin middleware - check if user has admin role
export function requireAdmin(user) {
  if (!user) {
    throw new Error('Authentication required');
  }

  if (user.role !== 'admin') {
    throw new Error('Admin privileges required');
  }
}

// Moderator middleware - check if user has moderator or admin role
export function requireModerator(user) {
  if (!user) {
    throw new Error('Authentication required');
  }

  if (!['moderator', 'admin'].includes(user.role)) {
    throw new Error('Moderator or admin privileges required');
  }
}

// Role-based middleware factory
export function requireRole(allowedRoles) {
  return (user) => {
    if (!user) {
      throw new Error('Authentication required');
    }

    if (!allowedRoles.includes(user.role)) {
      throw new Error(`Required role: ${allowedRoles.join(' or ')}. Your role: ${user.role}`);
    }
  };
}

// Optional auth middleware - doesn't fail if no token, but adds user if token is valid
export async function optionalAuthMiddleware(req) {
  try {
    const authHeader = req.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // No token provided, continue without user
      return { user: null, token: null };
    }

    const token = authHeader.substring(7);
    const decoded = await verifyAccessToken(token);
    
    await connectDB();
    const user = await User.findById(decoded.id);
    
    if (user && user.isActive) {
      return { user, token };
    }

    return { user: null, token: null };
  } catch (error) {
    // Invalid token, but don't fail - just continue without user
    return { user: null, token: null };
  }
}

// Rate limiting helper (simple in-memory implementation)
const rateLimitMap = new Map();

export function rateLimit(windowMs = 15 * 60 * 1000, max = 5) {
  return (identifier) => {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Clean old entries
    const attempts = rateLimitMap.get(identifier) || [];
    const validAttempts = attempts.filter(timestamp => timestamp > windowStart);
    
    if (validAttempts.length >= max) {
      throw new Error(`Too many attempts. Try again in ${Math.ceil(windowMs / 60000)} minutes.`);
    }
    
    // Add current attempt
    validAttempts.push(now);
    rateLimitMap.set(identifier, validAttempts);
    
    return true;
  };
}

// Get client IP helper
export function getClientIP(req) {
  const forwarded = req.headers.get('x-forwarded-for');
  const realIP = req.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP.trim();
  }
  
  return 'unknown';
}
