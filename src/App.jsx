import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AuthPage from './pages/AuthPage'
import CreateCampaign from './pages/CreateCampaign'
import CampaignDetails from './pages/CampaignDetails'
import Discover from './pages/Discover'
import StudentDashboard from './pages/StudentDashboard'
import CompanyDashboard from './pages/CompanyDashboard'
import SupportAmount from './pages/SupportAmount'
import PaymentPage from './pages/PaymentPage'
import CreateCampaignForm from './pages/CreateCampaignForm'

function AppContent() {
  const location = useLocation();
  const hideNavbarFooter = 
    location.pathname === '/signup' ||
    location.pathname === '/support/payment';

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
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
      <AppContent />
    </BrowserRouter>
  )
}

export default App
