import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import connectDB from '../../../lib/db/mongoose.js';
import { authMiddleware } from '../../../lib/auth/middleware.js';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const MAX_FILE_SIZE = Number(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024; // default 5MB
const MAX_FILE_SIZE_MB = Math.ceil(MAX_FILE_SIZE / (1024 * 1024));
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/heic', 'image/heif', 'image/avif'];
const ALLOWED_EXTENSIONS = ['.jpeg', '.jpg', '.png', '.webp', '.gif', '.heic', '.heif', '.avif'];

// Ensure upload directory exists
async function ensureUploadDir() {
  try {
    await mkdir(UPLOAD_DIR, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

// POST /api/upload - Upload file (requires authentication)
export async function POST(request) {
  try {
    console.log('🔍 Upload request received');
    console.log('Headers:', Object.fromEntries(request.headers.entries()));
    
    // Authenticate user
    const { user } = await authMiddleware(request);
    console.log('✅ User authenticated:', user.email, user.role);
    
    // Connect to database
    await connectDB();

    // Ensure upload directory exists
    await ensureUploadDir();

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type/extension
    const originalExt = path.extname(file.name || '').toLowerCase();
    const typeAllowed = file.type ? ALLOWED_TYPES.includes(file.type.toLowerCase()) : false;
    const extAllowed = ALLOWED_EXTENSIONS.includes(originalExt);
    if (!typeAllowed && !extAllowed) {
      const msg = 'Invalid file type. Allowed: JPEG, PNG, WebP, GIF, HEIC/HEIF, AVIF.';
      return NextResponse.json(
        { error: msg, message: msg },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      const msg = `File too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`;
      return NextResponse.json(
        { error: msg, message: msg },
        { status: 400 }
      );
    }

    // Decide output format based on extension (fallback to JPEG)
    let outputExt = '.jpg';
    let outputFormat = 'jpeg';
    if (originalExt === '.png') {
      outputExt = '.png';
      outputFormat = 'png';
    } else if (originalExt === '.webp') {
      outputExt = '.webp';
      outputFormat = 'webp';
    } else if (originalExt === '.jpeg' || originalExt === '.jpg' || originalExt === '') {
      outputExt = '.jpg';
      outputFormat = 'jpeg';
    } else if (originalExt === '.gif') {
      // Convert GIF to JPEG
      outputExt = '.jpg';
      outputFormat = 'jpeg';
    } else if (originalExt === '.heic' || originalExt === '.heif' || originalExt === '.avif') {
      // Convert HEIC/HEIF/AVIF to JPEG for broader compatibility
      outputExt = '.jpg';
      outputFormat = 'jpeg';
    }

    const uniqueFilename = `${uuidv4()}${outputExt}`;
    const filePath = path.join(UPLOAD_DIR, uniqueFilename);

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Process image with Sharp and preserve chosen output format
    let processedBuffer = buffer;
    if ((file.type && file.type.startsWith('image/')) || extAllowed) {
      let transformer = sharp(buffer).resize(1200, 1200, {
        fit: 'inside',
        withoutEnlargement: true
      });
      if (outputFormat === 'jpeg') {
        transformer = transformer.jpeg({ quality: 85 });
      } else if (outputFormat === 'png') {
        transformer = transformer.png({ compressionLevel: 9 });
      } else if (outputFormat === 'webp') {
        transformer = transformer.webp({ quality: 85 });
      }
      processedBuffer = await transformer.toBuffer();
    }

    // Save file
    await writeFile(filePath, processedBuffer);

    // Generate thumbnail
    let thumbnailFilename = null;
    if ((file.type && file.type.startsWith('image/')) || extAllowed) {
      thumbnailFilename = `thumb_${uniqueFilename}`;
      const thumbnailPath = path.join(UPLOAD_DIR, thumbnailFilename);
      
      await sharp(buffer)
        .resize(300, 300, { 
          fit: 'cover',
          position: 'center' 
        })
        .jpeg({ quality: 80 })
        .toBuffer()
        .then(thumbnailBuffer => writeFile(thumbnailPath, thumbnailBuffer));
    }

    const fileUrl = `/uploads/${uniqueFilename}`;
    const thumbnailUrl = thumbnailFilename ? `/uploads/${thumbnailFilename}` : null;

    return NextResponse.json({
      message: 'File uploaded successfully',
      file: {
        filename: uniqueFilename,
        originalName: file.name,
        url: fileUrl,
        thumbnailUrl,
        size: processedBuffer.length,
        type: file.type,
        uploadedBy: user._id,
        uploadedAt: new Date()
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    console.error('Error stack:', error.stack);
    
    if (error.message.includes('Authentication failed')) {
      return NextResponse.json(
        { error: 'Authentication required', message: error.message },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        error: 'Erreur lors de l\'upload',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
