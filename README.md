# Association Najm - Next.js Application

This is the migrated Next.js version of the Association Najm website, converted from a MERN stack application.

## Features

- **Modern Next.js 15** with App Router
- **Authentication System** with JWT tokens and role-based access control
- **Project Management** with CRUD operations and filtering
- **Contact Forms** with email notifications
- **Admin Dashboard** with statistics and management tools
- **File Upload** with image processing using Sharp
- **Responsive Design** with Tailwind CSS
- **MongoDB Integration** with Mongoose ODM
- **Multilingual Support** (French, English, Arabic) - Ready for i18n setup

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with jose library
- **File Processing**: Sharp for image optimization
- **Icons**: Native Emoji Icons
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **Animations**: React CountUp

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard
│   ├── projects/          # Project pages
│   ├── contact/           # Contact page
│   └── ...
├── components/            # React components
│   ├── layout/           # Layout components (Navbar, Footer)
│   ├── sections/         # Page sections
│   ├── projects/         # Project-related components
│   └── admin/            # Admin components
├── contexts/             # React contexts
├── hooks/                # Custom React hooks
└── lib/                  # Utility libraries
    ├── auth/             # Authentication utilities
    └── db/               # Database models and connection
```

## Setup Instructions

### 1. Environment Variables

Copy the example environment file and configure your variables:

```bash
cp env.example .env.local
```

Configure the following variables in `.env.local`:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# Email Configuration (SMTP)
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email@domain.com
SMTP_PASS=your_email_password
FROM_EMAIL=noreply@association-najm.org
FROM_NAME=Association Najm

# Upload Configuration
UPLOAD_PATH=public/uploads
MAX_FILE_SIZE=5242880

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
DEFAULT_LANGUAGE=fr
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

Make sure MongoDB is running and accessible with your connection string.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/logout` - User logout

### Projects
- `GET /api/projects` - List projects with filtering
- `POST /api/projects` - Create new project (auth required)
- `GET /api/projects/[id]` - Get single project
- `PUT /api/projects/[id]` - Update project (auth required)
- `DELETE /api/projects/[id]` - Delete project (auth required)

### Contact
- `GET /api/contact` - List contacts (admin only)
- `POST /api/contact` - Submit contact form

### Upload
- `POST /api/upload` - Upload files (auth required)

### Admin
- `GET /api/admin/dashboard` - Dashboard statistics (admin only)

## User Roles

- **Admin**: Full access to all features
- **Moderator**: Can manage projects and view contacts
- **User**: Basic access (future implementation)

## Migration Notes

This application was migrated from a MERN stack to Next.js 15 while preserving all functionality:

- Express.js routes → Next.js API routes
- React Router → Next.js App Router
- Separate frontend/backend → Unified Next.js application
- Client-side routing → Server-side rendering with client components
- JWT implementation updated for Next.js compatibility

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment

```bash
npm run build
npm run start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
