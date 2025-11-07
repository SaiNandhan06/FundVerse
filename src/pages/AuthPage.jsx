import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthPage() {
  const [activeTab, setActiveTab] = useState('login');
  const [role, setRole] = useState('student');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  // Dummy credentials for testing
  const DUMMY_CREDENTIALS = {
    student: {
      email: 'student@fundverse.com',
      password: 'student123'
    },
    company: {
      email: 'company@fundverse.com',
      password: 'company123'
    }
  };

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
    
    // Check dummy credentials
    const credentials = DUMMY_CREDENTIALS[role];
    if (loginForm.email === credentials.email && loginForm.password === credentials.password) {
      // Successful login - navigate to appropriate dashboard
      if (role === 'student') {
        navigate('/student/dashboard');
      } else {
        navigate('/company/dashboard');
      }
    } else {
      // Show error (you can add a toast/alert here)
      alert('Invalid credentials. Please use the dummy credentials shown below.');
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Show toast notification
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
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
        <div className="fixed top-4 right-4 bg-fundverseSuccess text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
          Account created successfully
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
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                role === 'student'
                  ? 'bg-white text-iconBlue shadow-lg'
                  : 'bg-fundverseIndigo text-white hover:bg-fundverseBlue'
              }`}
            >
              Student
            </button>
            <button
              onClick={() => setRole('company')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                role === 'company'
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
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                activeTab === 'login'
                  ? 'text-fundverseOrange border-b-2 border-fundverseOrange'
                  : 'text-mutedText hover:text-fundverseGrayDark'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                activeTab === 'signup'
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
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                  role === 'student'
                    ? 'bg-fundverseOrange text-white shadow-md'
                    : 'bg-fundverseBgLight text-fundverseGrayDark hover:bg-fundverseGrayLight'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => setRole('company')}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                  role === 'company'
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

              {/* Dummy Credentials Info */}
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs font-semibold text-blue-800 mb-1">Test Credentials:</p>
                <p className="text-xs text-blue-700">
                  <strong>Email:</strong> {DUMMY_CREDENTIALS[role].email}
                </p>
                <p className="text-xs text-blue-700">
                  <strong>Password:</strong> {DUMMY_CREDENTIALS[role].password}
                </p>
              </div>

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
                    placeholder={DUMMY_CREDENTIALS[role].email}
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
                    placeholder={DUMMY_CREDENTIALS[role].password}
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

              {/* Social Login Buttons */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-fundverseGrayLight"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-mutedText">Or continue with</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleSocialLogin('Google')}
                    className="flex items-center justify-center px-4 py-2 border border-fundverseGrayLight rounded-lg hover:bg-fundverseBgLight transition-all duration-200 hover:border-fundverseOrange"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </button>
                  <button
                    onClick={() => handleSocialLogin('LinkedIn')}
                    className="flex items-center justify-center px-4 py-2 border border-fundverseGrayLight rounded-lg hover:bg-fundverseBgLight transition-all duration-200 hover:border-fundverseOrange"
                  >
                    <svg className="w-5 h-5 mr-2" fill="#0077B5" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </button>
                </div>
              </div>
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

              {/* Social Login Buttons */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-fundverseGrayLight"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-mutedText">Or continue with</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleSocialLogin('Google')}
                    className="flex items-center justify-center px-4 py-2 border border-fundverseGrayLight rounded-lg hover:bg-fundverseBgLight transition-all duration-200 hover:border-fundverseOrange"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </button>
                  <button
                    onClick={() => handleSocialLogin('LinkedIn')}
                    className="flex items-center justify-center px-4 py-2 border border-fundverseGrayLight rounded-lg hover:bg-fundverseBgLight transition-all duration-200 hover:border-fundverseOrange"
                  >
                    <svg className="w-5 h-5 mr-2" fill="#0077B5" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;

