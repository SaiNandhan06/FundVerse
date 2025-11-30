import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { SearchProvider } from './context/SearchContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AuthPage from './pages/AuthPage'
import CreateCampaign from './pages/CreateCampaign'
import CampaignDetails from './pages/CampaignDetails'
import Discover from './pages/Discover'
import StudentDashboard from './pages/StudentDashboard'
import CompanyDashboard from './pages/CompanyDashboard'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './pages/AdminLogin'
import SupportAmount from './pages/SupportAmount'
import PaymentPage from './pages/PaymentPage'
import CreateCampaignForm from './pages/CreateCampaignForm'

function AppContent() {
  const location = useLocation();
  const hideNavbarFooter =
    location.pathname === '/signup' ||
    location.pathname === '/support/payment';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {!hideNavbarFooter && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/create" element={<CreateCampaign />} />
          <Route path="/create/form" element={<CreateCampaignForm />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/campaign/:id" element={<CampaignDetails />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/projects" element={<StudentDashboard />} />
          <Route path="/company/dashboard" element={<CompanyDashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/support" element={<SupportAmount />} />
          <Route path="/support/payment" element={<PaymentPage />} />
        </Routes>
      </main>
      {!hideNavbarFooter && <Footer />}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <SearchProvider>
        <AppContent />
      </SearchProvider>
    </BrowserRouter>
  )
}

export default App
