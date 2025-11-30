import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../services/storage/storageKeys';

function CreateCampaign() {
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // Check if user is logged in as student
    const userStr = sessionStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!userStr) {
      // Not logged in
      setAuthError('login');
      return;
    }

    try {
      const user = JSON.parse(userStr);
      if (user.role !== 'student') {
        // Not a student
        setAuthError('student');
      }
    } catch (error) {
      console.error('Error parsing user:', error);
      setAuthError('login');
    }
  }, []);

  // If there's an auth error, show message instead of content
  if (authError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {authError === 'login' ? 'Login Required' : 'Student Access Only'}
          </h1>

          {/* Message */}
          <p className="text-gray-600 mb-8 text-lg">
            {authError === 'login'
              ? 'Please login as a student to create a campaign and bring your ideas to life.'
              : 'Only students can create campaigns. Please login with a student account to continue.'}
          </p>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => navigate('/login')}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg"
            >
              {authError === 'login' ? 'Login as Student' : 'Switch to Student Account'}
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="create-container">
        <div className="w-full max-w-2xl">
          <div className="create-card">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Launch Your Startup
            </h1>

            <p className="text-gray-600 mb-8 text-lg">
              Need help? Check out our{' '}
              <a href="#" className="text-orange-500 hover:opacity-80 underline transition-colors">
                student entrepreneur guide
              </a>.
            </p>

            <Link
              to="/create/form"
              className="inline-block bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity shadow-md hover:shadow-lg"
            >
              Create New Startup Campaign
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCampaign;
