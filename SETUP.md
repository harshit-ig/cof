# Fishery College Website Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or cloud instance)
- npm or yarn

## Quick Start

### 1. Install Dependencies
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Setup
```bash
# Copy the example environment file
cd backend
copy env.example .env

# Edit .env with your actual values
# - Set MONGODB_URI to your MongoDB connection string
# - Change JWT_SECRET to a secure random string
# - Adjust other settings as needed
```

### 3. Start Development Servers

#### Option A: Start both servers (recommended)
```bash
# From the root directory
npm run dev
```

#### Option B: Start servers separately
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

## Environment Variables

### Required
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens

### Optional
- `PORT`: Backend server port (default: 5000)
- `NODE_ENV`: Environment (development/production)
- `JWT_EXPIRE`: JWT token expiration (default: 30d)
- `CORS_ORIGINS`: Comma-separated allowed origins for production
- `RATE_LIMIT_WINDOW_MS`: Rate limiting window (default: 15 minutes)
- `RATE_LIMIT_MAX_REQUESTS`: Max requests per window (default: 10000)

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check your connection string in .env
   - Verify network access if using cloud MongoDB

2. **Port Already in Use**
   - Change PORT in .env
   - Kill processes using the port: `npx kill-port 5000`

3. **JWT Errors**
   - Ensure JWT_SECRET is set in .env
   - Restart server after changing .env

4. **CORS Issues**
   - Check CORS_ORIGINS in .env
   - Verify frontend URL is in allowed origins

### PowerShell Users
If using PowerShell on Windows, the scripts have been updated to use `;` instead of `&&` for compatibility.

## Production Deployment

1. Set `NODE_ENV=production`
2. Use strong, unique `JWT_SECRET`
3. Configure `CORS_ORIGINS` with your domain
4. Set up proper MongoDB authentication
5. Use environment-specific MongoDB URIs
6. Configure reverse proxy (nginx/Apache) if needed 




