import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { STORAGE_KEYS } from '../services/storage/storageKeys';
import { storageService } from '../services/storage/localStorage.service';
import { campaignsService } from '../services/data/campaigns.service';

function StudentDashboard() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(() => {
    // If on /student/projects route, set active section to projects
    return location.pathname === '/student/projects' ? 'projects' : 'overview';
  });
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('studentSidebarOpen');
    if (saved !== null) return JSON.parse(saved);
    return window.innerWidth >= 768;
  });
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('studentSidebarOpen', JSON.stringify(sidebarOpen));
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
      if (user.role !== 'student') {
        navigate('/login');
        return;
      }
      setCurrentUser(user);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    }
  }, [navigate]);

  // Update active section when route changes
  useEffect(() => {
    if (location.pathname === '/student/projects') {
      setActiveSection('projects');
    } else if (location.pathname === '/student/dashboard') {
      setActiveSection('overview');
    }
  }, [location.pathname]);

  // Get user's full data from localStorage
  const getUserData = () => {
    if (!currentUser) return null;
    const users = storageService.get(STORAGE_KEYS.USERS, []);
    const fullUserData = users.find(u => u.id === currentUser.id);
    return fullUserData || currentUser;
  };

  const userData = getUserData();

  // Load user's projects from localStorage
  const [myProjects, setMyProjects] = useState([]);

  // Student Profile Data - use actual user data (reactive to myProjects)
  const studentProfile = useMemo(() => {
    const realProjects = myProjects.filter(p => !p.id?.startsWith('dummy-'));
    const totalRaisedAmount = realProjects.reduce((sum, p) => {
      const raised = parseFloat(p.raised.replace(/[₹,]/g, '')) || 0;
      return sum + raised;
    }, 0);

    return {
      name: userData?.name || currentUser?.name || 'Student',
      email: userData?.email || currentUser?.email || '',
      college: userData?.college || 'Not specified',
      major: userData?.major || 'Not specified',
      ongoingProjects: realProjects.filter(p => p.status === 'Active' || p.status === 'approved').length,
      totalRaised: `₹${totalRaisedAmount.toLocaleString('en-IN')}`,
      profilePicture: 'data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Ccircle cx="50" cy="50" r="50" fill="%232563EB"/%3E%3Ccircle cx="50" cy="35" r="12" fill="%23DBEAFE"/%3E%3Cpath d="M25 70C25 60 30 55 40 55L60 55C70 55 75 60 75 70L75 85L25 85L25 70Z" fill="%23DBEAFE"/%3E%3C/svg%3E'
    };
  }, [userData, currentUser, myProjects]);

  const loadUserProjects = useCallback(async () => {
    try {
      // Get user's email from currentUser or from localStorage users
      const userEmail = currentUser?.email;
      const userId = currentUser?.id;

      if (!userEmail && !userId) {
        // Fallback to dummy project
        setMyProjects([
          {
            title: 'Smart Irrigation using IoT',
            category: 'AgriTech',
            goal: '₹50,000',
            raised: '₹42,500',
            fundedPercent: '85%',
            status: 'Active',
            created: '10/10/2025',
            id: 'dummy-1'
          }
        ]);
        return;
      }

      // Get all campaigns and filter manually to ensure we catch both email and ID matches
      const allCampaigns = await campaignsService.getAll();
      const userProjects = allCampaigns.filter(campaign => {
        // Check by ID (most reliable)
        if (userId && (campaign.creator?.id === userId || campaign.userId === userId)) {
          return true;
        }
        // Check by Email
        if (userEmail && (
          campaign.creator?.email === userEmail ||
          campaign.email === userEmail ||
          campaign.creatorEmail === userEmail
        )) {
          return true;
        }
        return false;
      });

      const formattedProjects = userProjects.map(campaign => {
        const raised = campaign.raised || 0;
        const target = campaign.targetAmount || 0;
        const fundedPercent = target > 0 ? Math.round((raised / target) * 100) : 0;

        return {
          title: campaign.campaignTitle || campaign.title || 'Untitled Campaign',
          category: campaign.category || 'Others',
          goal: `₹${target.toLocaleString('en-IN')}`,
          raised: `₹${raised.toLocaleString('en-IN')}`,
          fundedPercent: `${fundedPercent}%`,
          backers: (campaign.backers || 0).toString(),
          status: campaign.status || 'Active',
          created: campaign.created ? new Date(campaign.created).toLocaleDateString('en-IN') : 'N/A',
          id: campaign.id
        };
      });

      // Add 1 dummy project if user has no projects
      if (formattedProjects.length === 0) {
        setMyProjects([
          {
            title: 'Smart Irrigation using IoT',
            category: 'AgriTech',
            goal: '₹50,000',
            raised: '₹42,500',
            fundedPercent: '85%',
            status: 'Active',
            created: '10/10/2025',
            id: 'dummy-1'
          }
        ]);
      } else {
        setMyProjects(formattedProjects);
      }
    } catch (error) {
      console.error('Error loading user projects:', error);
      // Fallback to 1 dummy project
      setMyProjects([
        {
          title: 'Smart Irrigation using IoT',
          category: 'AgriTech',
          goal: '₹50,000',
          raised: '₹42,500',
          fundedPercent: '85%',
          status: 'Active',
          created: '10/10/2025',
          id: 'dummy-1'
        }
      ]);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      loadUserProjects();
    }
  }, [currentUser, loadUserProjects]);

  // Reload projects when navigating to projects section
  useEffect(() => {
    if (currentUser && activeSection === 'projects') {
      loadUserProjects();
    }
  }, [activeSection, currentUser, loadUserProjects]);

  // Funding Analytics - calculate from actual projects
  const analytics = useMemo(() => {
    const realProjects = myProjects.filter(p => !p.id?.startsWith('dummy-'));
    const completedProjects = realProjects.filter(p =>
      p.status === 'Completed' || parseFloat(p.fundedPercent.replace('%', '')) >= 100
    ).length;
    const totalBackers = realProjects.reduce((sum, p) => {
      return sum + (parseInt(p.backers) || 0);
    }, 0);

    return {
      totalCampaigns: realProjects.length,
      successRate: realProjects.length > 0
        ? `${Math.round((completedProjects / realProjects.length) * 100)}%`
        : '0%',
      totalBackers: totalBackers
    };
  }, [myProjects]);

  // Recent Supporters
  const recentSupporters = [
    { name: 'Priya Sharma', amount: '₹5,000', date: '15/01/2025' },
    { name: 'Rahul Kumar', amount: '₹3,500', date: '12/01/2025' },
    { name: 'Anjali Patel', amount: '₹2,000', date: '08/01/2025' }
  ];

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'projects', label: 'My Projects', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { id: 'analytics', label: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { id: 'community', label: 'Community', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { id: 'profile', label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  ];

  const getStatusColor = (status) => {
    const normalizedStatus = status?.toLowerCase();
    switch (normalizedStatus) {
      case 'active':
      case 'approved':
        return 'bg-[#3B82F6] text-white';
      case 'pending':
        return 'bg-[#F59E0B] text-white';
      case 'completed':
        return 'bg-[#10B981] text-white';
      case 'rejected':
        return 'bg-[#EF4444] text-white';
      default:
        return 'bg-[#6B7280] text-white';
    }
  };

  // Don't render if user is not authenticated
  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex">
      {/* Sidebar */}
      <aside
        className={`bg-[#FFFFFF] border-r border-[#E5E7EB] fixed h-screen z-40 transition-all duration-300 ease-in-out shadow-lg ${sidebarOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-0'
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
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ease-in-out flex items-center gap-3 ${activeSection === item.id
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
        <div className="p-8">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#111827]">Student Dashboard</h1>
              <p className="text-[#6B7280] mt-2">Welcome back, {studentProfile.name}!</p>
              {studentProfile.email && (
                <p className="text-sm text-[#6B7280] mt-1">{studentProfile.email}</p>
              )}
            </div>
          </div>

          {/* Overview Section */}
          {activeSection === 'overview' && (
            <>
              {/* Profile Section */}
              <div className="bg-[#FFFFFF] rounded-lg shadow-md p-6 mb-8 border border-[#E5E7EB]">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <img
                    src={studentProfile.profilePicture}
                    alt={studentProfile.name}
                    className="w-24 h-24 rounded-full border-4 border-[#EEF2FF] object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-[#111827] mb-2">{studentProfile.name}</h2>
                    <div className="space-y-1 text-[#6B7280]">
                      {studentProfile.college !== 'Not specified' && (
                        <p className="flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {studentProfile.college}
                        </p>
                      )}
                      {studentProfile.major !== 'Not specified' && (
                        <p className="flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          {studentProfile.major}
                        </p>
                      )}
                      {studentProfile.email && (
                        <p className="flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {studentProfile.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#EEF2FF] rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-[#3B82F6]">{studentProfile.ongoingProjects}</p>
                      <p className="text-sm text-[#6B7280]">Ongoing Projects</p>
                    </div>
                    <div className="bg-[#EEF2FF] rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-[#3B82F6]">{studentProfile.totalRaised}</p>
                      <p className="text-sm text-[#6B7280]">Total Raised</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* My Projects Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#111827] mb-6">My Projects</h2>
                {myProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {myProjects.map((project, index) => (
                      <div
                        key={project.id || index}
                        className="bg-[#FFFFFF] rounded-lg shadow-md p-6 border border-[#E5E7EB] hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.02]"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-[#111827] mb-2">{project.title}</h3>
                            <span className="inline-block px-3 py-1 bg-[#EEF2FF] text-[#3B82F6] rounded-full text-sm font-medium">
                              {project.category}
                            </span>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                            {project.status?.charAt(0).toUpperCase() + project.status?.slice(1)}
                          </span>
                        </div>

                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-[#6B7280]">Progress</span>
                            <span className="font-semibold text-[#111827]">{project.fundedPercent}</span>
                          </div>
                          <div className="w-full bg-[#E5E7EB] rounded-full h-2">
                            <div
                              className="bg-[#3B82F6] h-2 rounded-full transition-all duration-300"
                              style={{ width: project.fundedPercent }}
                            ></div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-[#6B7280]">Goal</p>
                            <p className="text-lg font-bold text-[#111827]">{project.goal}</p>
                          </div>
                          <div>
                            <p className="text-sm text-[#6B7280]">Raised</p>
                            <p className="text-lg font-bold text-[#111827]">{project.raised}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-[#E5E7EB]">
                          <span className="text-sm text-[#6B7280]">Created: {project.created}</span>
                          <div className="flex gap-2">
                            <Link
                              to={`/campaign/${project.id}`}
                              className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors text-sm font-medium"
                            >
                              View Details
                            </Link>
                            {project.id && !project.id.startsWith('dummy-') && (
                              <button
                                onClick={async () => {
                                  if (window.confirm(`Are you sure you want to delete "${project.title}"? This action cannot be undone.`)) {
                                    try {
                                      await campaignsService.delete(project.id);
                                      loadUserProjects(); // Reload the list
                                    } catch (error) {
                                      console.error('Error deleting campaign:', error);
                                      alert('Failed to delete campaign. Please try again.');
                                    }
                                  }
                                }}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-[#FFFFFF] rounded-lg shadow-md p-12 text-center border border-[#E5E7EB]">
                    <svg className="w-16 h-16 text-[#6B7280] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <p className="text-xl font-semibold text-[#111827] mb-2">No Projects Yet</p>
                    <p className="text-[#6B7280] mb-6">Start your first campaign to get funding for your innovative ideas!</p>
                    <Link
                      to="/create/form"
                      className="inline-block px-6 py-3 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors font-medium"
                    >
                      Create Your First Project
                    </Link>
                  </div>
                )}
              </div>

              {/* Funding Analytics Section */}
              <div className="bg-[#FFFFFF] rounded-lg shadow-md p-6 mb-8 border border-[#E5E7EB]">
                <h2 className="text-xl font-bold text-[#111827] mb-6">Funding Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-[#EEF2FF] rounded-lg">
                    <p className="text-3xl font-bold text-[#3B82F6] mb-2">{analytics.totalCampaigns}</p>
                    <p className="text-sm text-[#6B7280]">Total Campaigns Started</p>
                  </div>
                  <div className="text-center p-4 bg-[#EEF2FF] rounded-lg">
                    <p className="text-3xl font-bold text-[#3B82F6] mb-2">{analytics.successRate}</p>
                    <p className="text-sm text-[#6B7280]">Average Funding Success Rate</p>
                  </div>
                  <div className="text-center p-4 bg-[#EEF2FF] rounded-lg">
                    <p className="text-3xl font-bold text-[#3B82F6] mb-2">{analytics.totalBackers}</p>
                    <p className="text-sm text-[#6B7280]">Total Backers</p>
                  </div>
                </div>
              </div>

              {/* Recent Supporters Section */}
              <div className="bg-[#FFFFFF] rounded-lg shadow-md p-6 border border-[#E5E7EB]">
                <h2 className="text-xl font-bold text-[#111827] mb-6">Recent Supporters</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#E5E7EB]">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-[#111827]">Name</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-[#111827]">Amount</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-[#111827]">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentSupporters.map((supporter, index) => (
                        <tr key={index} className="border-b border-[#E5E7EB] hover:bg-[#EEF2FF] transition-colors">
                          <td className="py-3 px-4 text-[#111827] font-medium">{supporter.name}</td>
                          <td className="py-3 px-4 text-[#3B82F6] font-semibold">{supporter.amount}</td>
                          <td className="py-3 px-4 text-[#6B7280]">{supporter.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* My Projects Section */}
          {activeSection === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#111827]">My Projects</h2>
                <button
                  onClick={() => {
                    setActiveSection('overview');
                    if (location.pathname === '/student/projects') {
                      navigate('/student/dashboard');
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-[#6B7280] hover:text-[#111827] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Back to Overview</span>
                </button>
              </div>

              {myProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {myProjects.map((project, index) => (
                    <div
                      key={index}
                      className="bg-[#FFFFFF] rounded-lg shadow-md p-6 border border-[#E5E7EB] hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.02]"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-[#111827] mb-2">{project.title}</h3>
                          <span className="inline-block px-3 py-1 bg-[#EEF2FF] text-[#3B82F6] rounded-full text-sm font-medium">
                            {project.category}
                          </span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                          {project.status?.charAt(0).toUpperCase() + project.status?.slice(1)}
                        </span>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-[#6B7280]">Progress</span>
                          <span className="font-semibold text-[#111827]">{project.fundedPercent}</span>
                        </div>
                        <div className="w-full bg-[#E5E7EB] rounded-full h-2">
                          <div
                            className="bg-[#3B82F6] h-2 rounded-full transition-all duration-300"
                            style={{ width: project.fundedPercent }}
                          ></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-[#6B7280]">Goal</p>
                          <p className="text-lg font-bold text-[#111827]">{project.goal}</p>
                        </div>
                        <div>
                          <p className="text-sm text-[#6B7280]">Raised</p>
                          <p className="text-lg font-bold text-[#111827]">{project.raised}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-[#E5E7EB]">
                        <span className="text-sm text-[#6B7280]">Created: {project.created}</span>
                        <div className="flex gap-2">
                          <Link
                            to={`/campaign/${project.id}`}
                            className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors text-sm font-medium"
                          >
                            View Details
                          </Link>
                          {project.id && !project.id.startsWith('dummy-') && (
                            <button
                              onClick={async () => {
                                if (window.confirm(`Are you sure you want to delete "${project.title}"? This action cannot be undone.`)) {
                                  try {
                                    await campaignsService.delete(project.id);
                                    loadUserProjects(); // Reload the list
                                  } catch (error) {
                                    console.error('Error deleting campaign:', error);
                                    alert('Failed to delete campaign. Please try again.');
                                  }
                                }
                              }}
                              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[#FFFFFF] rounded-lg shadow-md p-12 text-center border border-[#E5E7EB]">
                  <svg className="w-16 h-16 text-[#6B7280] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <p className="text-xl font-semibold text-[#111827] mb-2">No Projects Yet</p>
                  <p className="text-[#6B7280] mb-6">Start your first campaign to get funding for your innovative ideas!</p>
                  <Link
                    to="/create/form"
                    className="inline-block px-6 py-3 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors font-medium"
                  >
                    Create Your First Project
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Other Sections Placeholder */}
          {activeSection !== 'overview' && activeSection !== 'projects' && (
            <div className="bg-[#FFFFFF] rounded-lg shadow-md p-8 text-center border border-[#E5E7EB]">
              <p className="text-[#6B7280]">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} section coming soon</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default StudentDashboard;
