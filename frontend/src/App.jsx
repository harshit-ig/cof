import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Layout Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ErrorBoundary from './components/common/ErrorBoundary'

// Public Pages
import Home from './pages/Home'
import About from './pages/About'
import Programs from './pages/Programs'
import ProgramDetail from './pages/ProgramDetail'
import Faculty from './pages/Faculty'
import FacultyDetail from './pages/FacultyDetail'
import Research from './pages/Research'
import ResearchDetail from './pages/ResearchDetail'
import Extension from './pages/Extension'
import Infrastructure from './pages/Infrastructure'
import InfrastructureDetail from './pages/InfrastructureDetail'
import Incubation from './pages/Incubation'
import Students from './pages/Students'
import News from './pages/News'
import NewsDetail from './pages/NewsDetail'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import Collaborations from './pages/Collaborations'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import Departments from './pages/Departments'
import Publications from './pages/Publications'
import NotFound from './pages/NotFound'
import Workshop from './pages/Workshop'
import Achievements from './pages/Achievements'
import Media from './pages/Media'
import Library from './pages/Library'
import NoticeBoard from './pages/NoticeBoard'
import StudentCorner from './pages/StudentCorner'
import Academics from './pages/Academics'

// Admin Components
import AdminLogin from './components/admin/AdminLogin'
import AdminDashboard from './components/admin/AdminDashboard'
import ProtectedRoute from './components/admin/ProtectedRoute'

// Context Providers
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            
            <main className="flex-grow">
              <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/programs/:id" element={<ProgramDetail />} />
                            <Route path="/faculty" element={<Faculty />} />
              <Route path="/faculty/:id" element={<FacultyDetail />} />
              <Route path="/research" element={<Research />} />
              <Route path="/research/:id" element={<ResearchDetail />} />
              <Route path="/extension" element={<Extension />} />
              <Route path="/infrastructure" element={<Infrastructure />} />
              <Route path="/infrastructure/:id" element={<InfrastructureDetail />} />
              <Route path="/incubation" element={<Incubation />} />
              <Route path="/students" element={<Students />} />
              <Route path="/news" element={<News />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/collaborations" element={<Collaborations />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/publications" element={<Publications />} />
              <Route path="/workshop" element={<Workshop />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/media" element={<Media />} />
              <Route path="/library" element={<Library />} />
              <Route path="/notice-board" element={<NoticeBoard />} />
              <Route path="/student-corner" element={<StudentCorner />} />
              <Route path="/academics" element={<Academics />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route 
                path="/admin/*" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          
          <Footer />
          
          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                theme: {
                  primary: '#10B981',
                  secondary: 'black',
                },
              },
              error: {
                duration: 4000,
                theme: {
                  primary: '#EF4444',
                  secondary: 'black',
                },
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
    </ErrorBoundary>
  )
}

export default App