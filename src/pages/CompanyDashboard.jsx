import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { STORAGE_KEYS } from '../services/storage/storageKeys';
import { storageService } from '../services/storage/localStorage.service';

function CompanyDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('companySidebarOpen');
    if (saved !== null) return JSON.parse(saved);
    return window.innerWidth >= 768;
  });
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('companySidebarOpen', JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

  useEffect(() => {
    // Check if user is authenticated
    const userStr = sessionStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!userStr) {
      navigate('/login');
      return;
    }

    try {
      const user = JSON.parse(userStr);
      // Verify user role
      if (user.role !== 'company') {
        navigate('/login');
        return;
      }
      setCurrentUser(user);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    }
  }, [navigate]);

  const handleSwitchRole = () => {
    navigate('/student/dashboard');
  };

  const handleLogout = () => {
    sessionStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    storageService.remove(STORAGE_KEYS.USER_ROLE);
    navigate('/login');
  };

  // Get user's full data from localStorage
  const getUserData = () => {
    if (!currentUser) return null;
    const users = storageService.get(STORAGE_KEYS.USERS, []);
    const fullUserData = users.find(u => u.id === currentUser.id);
    return fullUserData || currentUser;
  };

  const userData = getUserData();

  // Company Summary Data - use actual user data
  const companySummary = {
    name: userData?.name || currentUser?.name || 'Company',
    email: userData?.email || currentUser?.email || '',
    role: 'Admin',
    totalStartups: 0, // Will be calculated from actual campaigns
    totalFunds: '₹0', // Will be calculated from actual campaigns
    activeCampaigns: 0 // Will be calculated from actual campaigns
  };

  // Recent Campaigns Data
  const recentCampaigns = [
    { startup: 'HealthBridge India', category: 'HealthTech', goal: '₹1,25,000', raised: '₹95,000', status: 'Active', daysLeft: 14, location: 'Bangalore' },
    { startup: 'AgriGrow Solutions', category: 'AgriTech', goal: '₹80,000', raised: '₹80,000', status: 'Completed', daysLeft: 0, location: 'Hyderabad' },
    { startup: 'EduLearn Bharat', category: 'EdTech', goal: '₹60,000', raised: '₹42,000', status: 'Pending', daysLeft: 22, location: 'Pune' }
  ];

  // Admin Insights
  const adminInsights = {
    topCategory: 'AgriTech',
    mostFunded: { name: 'HealthBridge India', amount: '₹95,000' },
    pendingReviews: 3,
    totalBackers: 2100
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'discover', label: 'Discover Projects', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
    { id: 'portfolio', label: 'Portfolio', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { id: 'watchlist', label: 'Watchlist', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
    { id: 'mentorship', label: 'Mentorship', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { id: 'settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  ];

  const getStatusBadge = (status) => {
    const colors = {
      Active: 'bg-[#3B82F6] text-white',
      Completed: 'bg-[#10B981] text-white',
      Pending: 'bg-[#F59E0B] text-white'
    };
    return colors[status] || 'bg-[#6B7280] text-white';
  };

  // Don't render if user is not authenticated
  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex">
      {/* Sidebar */}
      <aside
        className={`bg-[#FFFFFF] border-r border-[#E5E7EB] fixed h-screen z-40 transition-all duration-300 ease-in-out shadow-lg ${
          sidebarOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-0'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header with Toggle */}
          <div className="p-4 border-b border-[#E5E7EB] flex items-center justify-between">
            {sidebarOpen && (
              <Link to="/" className="text-2xl font-bold text-[#111827]">
                <span className="text-[#111827]">Fund</span>
                <span className="text-[#4F46E5]">Verse</span>
              </Link>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-[#EEF2FF] transition-colors text-[#6B7280] hover:text-[#111827]"
            >
              {sidebarOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ease-in-out flex items-center gap-3 ${
                  activeSection === item.id
                    ? 'bg-[#3B82F6] text-white'
                    : 'text-[#6B7280] hover:bg-[#EEF2FF] hover:text-[#111827]'
                }`}
                title={!sidebarOpen ? item.label : ''}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Navbar */}
        <nav className="bg-[#FFFFFF] border-b border-[#E5E7EB] sticky top-0 z-30">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-[#111827]"
                />
              </div>
              <div className="flex items-center gap-4 ml-4">
                <Link
                  to="/discover"
                  className="px-4 py-2 text-[#111827] hover:text-[#2563EB] transition-colors font-medium"
                >
                  Explore
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="p-8">
          {/* Company Summary Header */}
          {activeSection === 'overview' && (
            <>
              <div className="bg-gradient-to-br from-[#4F46E5] to-[#3B82F6] rounded-lg shadow-lg p-8 mb-8 text-white">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{companySummary.name}</h1>
                    {companySummary.email && (
                      <p className="text-blue-100 text-sm mb-2">{companySummary.email}</p>
                    )}
                    <p className="text-blue-100 text-lg mb-4">Role: {companySummary.role}</p>
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <p className="text-2xl font-bold">{companySummary.totalStartups}</p>
                        <p className="text-sm text-blue-100">Total Startups Managed</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{companySummary.totalFunds}</p>
                        <p className="text-sm text-blue-100">Total Funds Distributed</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{companySummary.activeCampaigns}</p>
                        <p className="text-sm text-blue-100">Active Campaigns</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Campaigns Table */}
              <div className="bg-[#FFFFFF] rounded-lg shadow-md p-6 mb-8 border border-[#E5E7EB]">
                <h2 className="text-xl font-bold text-[#111827] mb-6">Recent Campaigns</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#E5E7EB]">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-[#111827]">Startup Name</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-[#111827]">Category</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-[#111827]">Funding Goal</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-[#111827]">Raised</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-[#111827]">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-[#111827]">Days Left</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentCampaigns.map((campaign, index) => (
                        <tr key={index} className="border-b border-[#E5E7EB] hover:bg-[#EEF2FF] transition-colors">
                          <td className="py-4 px-4 font-semibold text-[#111827]">{campaign.startup}</td>
                          <td className="py-4 px-4 text-[#6B7280]">{campaign.category}</td>
                          <td className="py-4 px-4 text-[#111827]">{campaign.goal}</td>
                          <td className="py-4 px-4 font-semibold text-[#3B82F6]">{campaign.raised}</td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(campaign.status)}`}>
                              {campaign.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-[#6B7280]">{campaign.daysLeft} days</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Admin Insights Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#FFFFFF] rounded-lg shadow-md p-6 border border-[#E5E7EB] hover:scale-[1.02] transition-all duration-300 ease-in-out">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-[#EEF2FF] rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm text-[#6B7280] mb-1">Top Performing Category</p>
                  <p className="text-2xl font-bold text-[#111827]">{adminInsights.topCategory}</p>
                </div>

                <div className="bg-[#FFFFFF] rounded-lg shadow-md p-6 border border-[#E5E7EB] hover:scale-[1.02] transition-all duration-300 ease-in-out">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-[#EEF2FF] rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm text-[#6B7280] mb-1">Most Funded Startup</p>
                  <p className="text-lg font-bold text-[#111827]">{adminInsights.mostFunded.name}</p>
                  <p className="text-sm text-[#3B82F6]">{adminInsights.mostFunded.amount}</p>
                </div>

                <div className="bg-[#FFFFFF] rounded-lg shadow-md p-6 border border-[#E5E7EB] hover:scale-[1.02] transition-all duration-300 ease-in-out">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-[#EEF2FF] rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm text-[#6B7280] mb-1">Pending Reviews</p>
                  <p className="text-2xl font-bold text-[#111827]">{adminInsights.pendingReviews}</p>
                </div>

                <div className="bg-[#FFFFFF] rounded-lg shadow-md p-6 border border-[#E5E7EB] hover:scale-[1.02] transition-all duration-300 ease-in-out">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-[#EEF2FF] rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#4F46E5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm text-[#6B7280] mb-1">Total Backers</p>
                  <p className="text-2xl font-bold text-[#111827]">{adminInsights.totalBackers.toLocaleString()}</p>
                </div>
              </div>
            </>
          )}

          {/* Other Sections Placeholder */}
          {activeSection !== 'overview' && (
            <div className="bg-[#FFFFFF] rounded-lg shadow-md p-8 text-center border border-[#E5E7EB]">
              <p className="text-[#6B7280]">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1).replace(/([A-Z])/g, ' $1')} section coming soon</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default CompanyDashboard;


