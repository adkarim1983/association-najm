import jwt from 'jsonwebtoken';
import { SignJWT, jwtVerify } from 'jose';

const JWT_ACCESS_SECRET = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);
const JWT_REFRESH_SECRET = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET);

// Generate access token using jose for Next.js compatibility
export async function generateAccessToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_ACCESS_EXPIRY || '15m')
    .setIssuer('association-najm')
    .setAudience('association-najm-users')
    .sign(JWT_ACCESS_SECRET);
}

// Generate refresh token using jose
export async function generateRefreshToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_REFRESH_EXPIRY || '7d')
    .setIssuer('association-najm')
    .setAudience('association-najm-users')
    .sign(JWT_REFRESH_SECRET);
}

// Verify access token
export async function verifyAccessToken(token) {
  try {
    const { payload } = await jwtVerify(token, JWT_ACCESS_SECRET);
    return payload;
  } catch (error) {
    throw new Error('Invalid access token');
  }
}

// Verify refresh token
export async function verifyRefreshToken(token) {
  try {
    const { payload } = await jwtVerify(token, JWT_REFRESH_SECRET);
    return payload;
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
}

// Legacy JWT functions for backward compatibility
export function generateAccessTokenLegacy(payload) {
  return jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET,
    { 
      expiresIn: process.env.JWT_ACCESS_EXPIRY || '15m',
      issuer: 'association-najm',
      audience: 'association-najm-users'
    }
  );
}

export function generateRefreshTokenLegacy(payload) {
  return jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET,
    { 
      expiresIn: process.env.JWT_REFRESH_EXPIRY || '7d',
      issuer: 'association-najm',
      audience: 'association-najm-users'
    }
  );
}

export function verifyAccessTokenLegacy(token) {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
}

export function verifyRefreshTokenLegacy(token) {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
}
