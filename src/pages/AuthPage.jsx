import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageService } from '../services/storage/localStorage.service';
import { STORAGE_KEYS } from '../services/storage/storageKeys';

function AuthPage() {
  const [activeTab, setActiveTab] = useState('login');
  const [role, setRole] = useState('student');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success'); // 'success' or 'error'
  const navigate = useNavigate();

  // Create default admin user on component mount
  useEffect(() => {
    const users = storageService.get(STORAGE_KEYS.USERS, []);
    const adminExists = users.find(u => u.email === 'admin@fundverse.com');

    if (!adminExists) {
      const adminUser = {
        id: 'admin-001',
        name: 'Admin',
        email: 'admin@fundverse.com',
        password: 'admin123',
        role: 'admin',
        createdAt: new Date().toISOString()
      };
      users.push(adminUser);
      storageService.set(STORAGE_KEYS.USERS, users);
    }
  }, []);

  // Form states
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Get all registered users from localStorage
    const users = storageService.get(STORAGE_KEYS.USERS, []);

    // Find user with matching email, password, and role
    const user = users.find(
      u => u.email === loginForm.email &&
        u.password === loginForm.password &&
        u.role === role
    );

    if (user) {
      // Store current user in sessionStorage for session management
      sessionStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }));

      // Store user role
      storageService.set(STORAGE_KEYS.USER_ROLE, user.role);

      // Successful login - navigate to appropriate dashboard
      if (role === 'student') {
        navigate('/student/dashboard');
      } else {
        navigate('/company/dashboard');
      }
    } else {
      // Show error toast
      setToastMessage('Invalid credentials. Please check your email and password.');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    // Validate password match
    if (signupForm.password !== signupForm.confirmPassword) {
      setToastMessage('Passwords do not match. Please try again.');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return;
    }

    // Validate password length
    if (signupForm.password.length < 6) {
      setToastMessage('Password must be at least 6 characters long.');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return;
    }

    // Get all registered users from localStorage
    const users = storageService.get(STORAGE_KEYS.USERS, []);

    // Check if email already exists
    const existingUser = users.find(u => u.email === signupForm.email);
    if (existingUser) {
      setToastMessage('Email already registered. Please use a different email or login.');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return;
    }

    // Create new user object
    const newUser = {
      id: Date.now().toString(), // Simple ID generation
      name: signupForm.name,
      email: signupForm.email,
      password: signupForm.password, // In production, this should be hashed
      role: role,
      createdAt: new Date().toISOString()
    };

    // Add new user to the users array
    users.push(newUser);

    // Save updated users array to localStorage
    storageService.set(STORAGE_KEYS.USERS, users);

    // Show success toast
    setToastMessage('Account created successfully! Please login to continue.');
    setToastType('success');
    setShowToast(true);

    // Clear form
    setSignupForm({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    // Navigate to login page after a short delay
    setTimeout(() => {
      setShowToast(false);
      setActiveTab('login');
      // Pre-fill email in login form
      setLoginForm({
        email: newUser.email,
        password: ''
      });
    }, 2000);
  };

  const handleLoginChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignupChange = (e) => {
    setSignupForm({
      ...signupForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSocialLogin = (provider) => {
    // Placeholder for social login
    console.log(`Continue with ${provider}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] relative">
      {/* Back to Home Button */}
      <div
        className="absolute top-24 left-6 z-10 flex items-center gap-2 text-[#2563EB] hover:text-[#1E40AF] cursor-pointer transition-colors p-4"
        onClick={() => navigate('/')}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="font-medium">Back to Home</span>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in ${toastType === 'success'
          ? 'bg-fundverseSuccess text-white'
          : 'bg-red-500 text-white'
          }`}>
          {toastMessage}
        </div>
      )}

      {/* Left Panel - Blue Gradient Background */}
      <div className="hidden lg:flex lg:w-1/2 bg-fundverse-gradient p-12 flex-col justify-between text-white">
        <div>
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-white">Fund</span>
            <span className="text-purple-300">Verse</span>
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            Where Ideas Take Flight & Futures Are Built
          </p>
          <p className="text-lg text-blue-100 leading-relaxed">
            Join thousands of creators and backers on FundVerse. Whether you're a student with an innovative idea or a company looking to fund the next big project, we're here to help you succeed.
          </p>
        </div>

        {/* Role Selection */}
        <div className="mt-8">
          <label className="block text-sm font-medium mb-3 text-blue-100">
            Select Your Role
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => setRole('student')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${role === 'student'
                ? 'bg-white text-iconBlue shadow-lg'
                : 'bg-fundverseIndigo text-white hover:bg-fundverseBlue'
                }`}
            >
              Student
            </button>
            <button
              onClick={() => setRole('company')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${role === 'company'
                ? 'bg-white text-iconIndigo shadow-lg'
                : 'bg-fundverseIndigo text-white hover:bg-fundverseBlue'
                }`}
            >
              Company
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel - Forms */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo for mobile */}
          <div className="lg:hidden mb-8 text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-[#1A202C]">Fund</span>
              <span className="text-[#805AD5]">Verse</span>
            </h1>
          </div>

          {/* Tabs */}
          <div className="flex mb-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${activeTab === 'login'
                ? 'text-fundverseOrange border-b-2 border-fundverseOrange'
                : 'text-mutedText hover:text-fundverseGrayDark'
                }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${activeTab === 'signup'
                ? 'text-fundverseOrange border-b-2 border-fundverseOrange'
                : 'text-mutedText hover:text-fundverseGrayDark'
                }`}
            >
              Sign Up
            </button>
          </div>

          {/* Role Selection for mobile */}
          <div className="lg:hidden mb-6">
            <label className="block text-sm font-medium text-fundverseGrayDark mb-2">
              Select Your Role
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setRole('student')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all text-sm ${role === 'student'
                  ? 'bg-fundverseOrange text-white shadow-md'
                  : 'bg-fundverseBgLight text-fundverseGrayDark hover:bg-fundverseGrayLight'
                  }`}
              >
                Student
              </button>
              <button
                onClick={() => setRole('company')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all text-sm ${role === 'company'
                  ? 'bg-fundverseOrange text-white shadow-md'
                  : 'bg-fundverseBgLight text-fundverseGrayDark hover:bg-fundverseGrayLight'
                  }`}
              >
                Company
              </button>
            </div>
          </div>

          {/* Login Form */}
          {activeTab === 'login' && (
            <div>
              <h2 className="text-2xl font-bold mb-2 text-fundverseGrayDark">
                {role === 'student' ? 'Sign in as Student' : 'Sign in as Company'}
              </h2>
              <p className="text-mutedText mb-6">
                Welcome back! Please sign in to your account.
              </p>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label htmlFor="login-email" className="block text-sm font-medium text-fundverseGrayDark mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="login-email"
                    name="email"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                    required
                    className="w-full px-4 py-2 border border-fundverseGrayLight rounded-lg focus:outline-none focus:ring-2 focus:ring-fundverseOrange focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="login-password" className="block text-sm font-medium text-fundverseGrayDark mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="login-password"
                    name="password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    required
                    className="w-full px-4 py-2 border border-fundverseGrayLight rounded-lg focus:outline-none focus:ring-2 focus:ring-fundverseOrange focus:border-transparent"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-fundverseGrayDark">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-fundverseOrange hover:underline">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-fundverse-gradient text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Sign In
                </button>
              </form>
            </div>
          )}

          {/* Sign Up Form */}
          {activeTab === 'signup' && (
            <div>
              <h2 className="text-2xl font-bold mb-2 text-fundverseGrayDark">
                Create Your Account
              </h2>
              <p className="text-mutedText mb-6">
                Join FundVerse and start your journey today.
              </p>

              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div>
                  <label htmlFor="signup-name" className="block text-sm font-medium text-fundverseGrayDark mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="signup-name"
                    name="name"
                    value={signupForm.name}
                    onChange={handleSignupChange}
                    required
                    className="w-full px-4 py-2 border border-fundverseGrayLight rounded-lg focus:outline-none focus:ring-2 focus:ring-fundverseOrange focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="signup-email" className="block text-sm font-medium text-fundverseGrayDark mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="signup-email"
                    name="email"
                    value={signupForm.email}
                    onChange={handleSignupChange}
                    required
                    className="w-full px-4 py-2 border border-fundverseGrayLight rounded-lg focus:outline-none focus:ring-2 focus:ring-fundverseOrange focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="signup-password" className="block text-sm font-medium text-fundverseGrayDark mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="signup-password"
                    name="password"
                    value={signupForm.password}
                    onChange={handleSignupChange}
                    required
                    className="w-full px-4 py-2 border border-fundverseGrayLight rounded-lg focus:outline-none focus:ring-2 focus:ring-fundverseOrange focus:border-transparent"
                    placeholder="Create a password"
                  />
                </div>

                <div>
                  <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-fundverseGrayDark mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="signup-confirm-password"
                    name="confirmPassword"
                    value={signupForm.confirmPassword}
                    onChange={handleSignupChange}
                    required
                    className="w-full px-4 py-2 border border-fundverseGrayLight rounded-lg focus:outline-none focus:ring-2 focus:ring-fundverseOrange focus:border-transparent"
                    placeholder="Confirm your password"
                  />
                </div>

                <div className="flex items-start">
                  <input type="checkbox" id="terms" className="mt-1 mr-2" required />
                  <label htmlFor="terms" className="text-sm text-fundverseGrayDark">
                    I agree to the{' '}
                    <a href="#" className="text-fundverseOrange hover:underline">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-fundverseOrange hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-fundverse-gradient text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Create Account
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Admin Button - Circular, Bottom Right */}
      <button
        onClick={() => {
          // Check if user is already logged in as admin
          const userStr = sessionStorage.getItem(STORAGE_KEYS.CURRENT_USER);
          if (userStr) {
            try {
              const user = JSON.parse(userStr);
              if (user.role === 'admin') {
                // Already logged in as admin, go directly to dashboard
                navigate('/admin/dashboard');
                return;
              }
            } catch (error) {
              console.error('Error parsing user:', error);
            }
          }
          // Not logged in as admin, go to login page
          navigate('/admin/login');
        }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        style={{ borderRadius: '50%' }}
        title="Admin Access"
      >
        {/* Admin Settings Icon */}
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>

        {/* Tooltip */}
        <span className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Admin Access
        </span>
      </button>
    </div>
  );
}

export default AuthPage;
