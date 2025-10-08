import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import useDocumentTitle from './hooks/useDocumentTitle'

// Layout Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ErrorBoundary from './components/common/ErrorBoundary'

// Public Pages
import Home from './pages/Home'
import About from './pages/About'
import ProgramDetail from './pages/ProgramDetail'
import Faculty from './pages/Faculty_Dynamic'
import Research from './pages/Research'
import ResearchDetail from './pages/ResearchDetail'
import Extension from './pages/Extension'
import Infrastructure from './pages/Infrastructure'
import InfrastructureDetail from './pages/InfrastructureDetail'
import Incubation from './pages/Incubation'
import NewsAndEvents from './pages/NewsAndEvents'
import NewsAndEventsDetail from './pages/NewsAndEventsDetail'
import Collaborations from './pages/Collaborations'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import NotFound from './pages/NotFound'
import StudentCorner from './pages/StudentCorner'
import Academics from './pages/Academics'
import Placement from './pages/Placement'
import FarmersCorner from './pages/FarmersCorner'
import Alumni from './pages/Alumni'

// Admin Components
import AdminLogin from './components/admin/AdminLogin'
import AdminDashboard from './components/admin/AdminDashboard'
import ProtectedRoute from './components/admin/ProtectedRoute'

// Context Providers
import { AuthProvider } from './context/AuthContext'
import { SettingsProvider } from './context/SettingsContext'

// Document Title Component
const DocumentTitleUpdater = () => {
  useDocumentTitle()
  return null
}

// Layout wrapper component to conditionally show Navbar and Footer
const AppLayout = ({ children }) => {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')
  
  return (
    <>
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <SettingsProvider>
          <DocumentTitleUpdater />
          <Router>
            <div className="min-h-screen bg-gray-50 flex flex-col">
              <AppLayout>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/academics" element={<Academics />} />
                  <Route path="/programs/:slug" element={<ProgramDetail />} />
                  <Route path="/faculty" element={<Faculty />} />
                  <Route path="/research" element={<Research />} />
                  <Route path="/research/:id" element={<ResearchDetail />} />
                  <Route path="/extension" element={<Extension />} />
                  <Route path="/infrastructure" element={<Infrastructure />} />
                  <Route path="/infrastructure/:id" element={<InfrastructureDetail />} />
                  <Route path="/incubation" element={<Incubation />} />
                  <Route path="/student-corner" element={<StudentCorner />} />
                  <Route path="/placement" element={<Placement />} />
                  <Route path="/news-and-events" element={<NewsAndEvents />} />
                  <Route path="/news-and-events/:id" element={<NewsAndEventsDetail />} />
                  <Route path="/collaborations" element={<Collaborations />} />
                  <Route path="/farmers-corner" element={<FarmersCorner />} />
                  <Route path="/alumni" element={<Alumni />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/contact" element={<Contact />} />
                  
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
              </AppLayout>
          
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
      </SettingsProvider>
    </AuthProvider>
    </ErrorBoundary>
  )
}

export default App





