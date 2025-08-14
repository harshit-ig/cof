# Fishery College Jabalpur - MERN Stack Website

A modern, responsive website for Fishery College Jabalpur built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS v4.

## 🚀 Features

- **Public Website**: Modern, responsive frontend showcasing college information
- **Admin Panel**: Secure admin dashboard for content management
- **Authentication**: JWT-based authentication system
- **File Uploads**: Image and document upload functionality
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Content Management**: Dynamic content management system
- **Search & Filtering**: Advanced search and filtering capabilities

## 📋 Project Structure

```
fishery-college-website/
├── backend/                 # Express.js API server
│   ├── config/             # Database configuration
│   ├── middleware/         # Custom middleware (auth, upload, etc.)
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API routes
│   ├── uploads/           # File uploads directory
│   ├── utils/             # Utility functions and seed data
│   ├── .env.example       # Environment variables template
│   ├── package.json       # Backend dependencies
│   └── server.js          # Express server entry point
├── frontend/               # React.js client application
│   ├── public/            # Static assets
│   ├── src/               # Source code
│   │   ├── components/    # Reusable React components
│   │   ├── context/       # React context providers
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main App component
│   │   └── main.jsx       # React entry point
│   ├── index.html         # HTML template
│   ├── package.json       # Frontend dependencies
│   ├── tailwind.config.js # Tailwind CSS configuration
│   └── vite.config.js     # Vite configuration
├── package.json           # Root package.json for scripts
└── README.md              # Project documentation
```

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **Multer** - File uploads
- **Bcrypt** - Password hashing
- **Helmet** - Security middleware
- **Express Rate Limit** - Rate limiting

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router DOM** - Client-side routing
- **Tailwind CSS v4** - Styling framework
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd fishery-college-website
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install backend dependencies
npm run install-server

# Install frontend dependencies
npm run install-client
```

### 3. Environment Configuration
```bash
# Copy environment template
cp backend/.env.example backend/.env

# Edit the .env file with your configuration
```

Required environment variables:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fishery_college
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=30d
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5000000
```

### 4. Database Setup
```bash
# Start MongoDB service (if using local MongoDB)
# For Windows:
net start MongoDB

# For macOS/Linux:
sudo systemctl start mongod

# Seed the database with dummy data
cd backend
npm run seed
```

### 5. Start Development Servers
```bash
# Start both backend and frontend concurrently
npm run dev

# Or start them separately:
# Backend only (http://localhost:5000)
npm run server

# Frontend only (http://localhost:3000)
npm run client
```

## 🗄️ Database Seeding

The project includes a comprehensive seed script that populates the database with dummy data:

```bash
cd backend
npm run seed
```

This will create:
- Admin user (username: `admin`, password: `admin123`)
- Sample programs, faculty, news, events, research projects
- Infrastructure information, collaborations, and content

## 👨‍💼 Admin Panel

Access the admin panel at: `http://localhost:3000/admin/login`

**Default Admin Credentials:**
- Username: `admin`
- Email: `admin@fisherycollegejabalpur.edu.in`
- Password: `admin123`

### Admin Features:
- Dashboard with overview statistics
- Programs management
- Faculty management
- News & events management
- Research projects management
- Infrastructure management
- Collaborations management
- Content management
- Settings and profile management

## 🌐 API Endpoints

### Public Endpoints
- `GET /api/programs` - Get all programs
- `GET /api/programs/:id` - Get program details
- `GET /api/faculty` - Get faculty list
- `GET /api/news` - Get news and events
- `GET /api/research` - Get research projects
- `GET /api/infrastructure` - Get infrastructure info
- `GET /api/collaborations` - Get collaborations

### Admin Endpoints (Protected)
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin
- `POST /api/programs` - Create program
- `PUT /api/programs/:id` - Update program
- `DELETE /api/programs/:id` - Delete program
- Similar CRUD operations for all content types

### File Upload
- `POST /api/upload/single` - Upload single file
- `POST /api/upload/multiple` - Upload multiple files
- `DELETE /api/upload/:filename` - Delete file

## 🎨 Styling & Theming

The project uses Tailwind CSS v4 with a custom theme:

### Color Palette
- **Primary**: Blue shades (educational theme)
- **Secondary**: Green shades (nature/environment)
- **Accent**: Orange/Yellow (highlights)

### Custom Components
- Responsive navigation with dropdown menus
- Card components with hover effects
- Form components with validation
- Modal components
- Loading states and animations

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

1. **Build the frontend:**
```bash
cd frontend
npm run build
```

2. **Deploy to Vercel:**
```bash
npm install -g vercel
vercel --prod
```

3. **Deploy to Netlify:**
- Connect your repository to Netlify
- Set build command: `cd frontend && npm run build`
- Set publish directory: `frontend/dist`

### Backend Deployment (Render/Heroku)

1. **Environment Variables:**
Set the following environment variables in your deployment platform:
```
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_production_jwt_secret
```

2. **Deploy to Render:**
- Connect your repository
- Set build command: `cd backend && npm install`
- Set start command: `cd backend && npm start`

3. **Deploy to Heroku:**
```bash
# Install Heroku CLI and login
heroku create your-app-name
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
git subtree push --prefix backend heroku main
```

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔒 Security Features

- JWT authentication with secure tokens
- Password hashing with bcrypt
- Rate limiting on API endpoints
- File upload validation and sanitization
- CORS configuration
- Helmet for security headers
- Input validation and sanitization

## 🧪 Testing

```bash
# Backend testing (if tests are added)
cd backend
npm test

# Frontend testing (if tests are added)
cd frontend
npm test
```

## 📝 Available Scripts

### Root Scripts
- `npm run dev` - Start both frontend and backend
- `npm run server` - Start backend only
- `npm run client` - Start frontend only
- `npm run install-all` - Install all dependencies

### Backend Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with dummy data

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and queries:
- Email: admin@fisherycollegejabalpur.edu.in
- Phone: +91 761 XXXXXXX

## 🙏 Acknowledgments

- Fishery College Jabalpur for project requirements
- MERN Stack community for excellent documentation
- Tailwind CSS team for the amazing framework
- All contributors and developers

---

**Note**: This is a complete MERN stack application with modern development practices. Make sure to change default passwords and secrets before deploying to production.