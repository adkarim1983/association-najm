import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import connectDB from '../../../lib/db/mongoose.js';
import { authMiddleware } from '../../../lib/auth/middleware.js';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

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
    // Authenticate user
    const { user } = await authMiddleware(request);
    
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

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const fileExtension = path.extname(file.name);
    const uniqueFilename = `${uuidv4()}${fileExtension}`;
    const filePath = path.join(UPLOAD_DIR, uniqueFilename);

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Process image with Sharp
    let processedBuffer = buffer;
    if (file.type.startsWith('image/')) {
      processedBuffer = await sharp(buffer)
        .resize(1200, 1200, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .jpeg({ quality: 85 })
        .toBuffer();
    }

    // Save file
    await writeFile(filePath, processedBuffer);

    // Generate thumbnail
    let thumbnailFilename = null;
    if (file.type.startsWith('image/')) {
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
    
    if (error.message.includes('Authentication failed')) {
      return NextResponse.json(
        { error: 'Authentication required', message: error.message },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        error: 'Upload failed',
        message: error.message
      },
      { status: 500 }
    );
  }
}
