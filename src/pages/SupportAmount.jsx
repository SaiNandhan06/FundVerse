import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../assets/my-logo.png.png';

function SupportAmount() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get project info from location state or use defaults
  const projectName = location.state?.projectName || 'AI-Powered Soil Health Scanner';
  const creatorName = location.state?.creatorName || 'Dr. Riya Iyer';
  
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const predefinedAmounts = [500, 1000, 2500, 5000, 10000];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || (!isNaN(value) && parseFloat(value) > 0)) {
      setCustomAmount(value);
      setSelectedAmount(null);
    }
  };

  const handleContinue = () => {
    const amount = selectedAmount || parseFloat(customAmount);
    if (amount && amount > 0) {
      navigate('/support/payment', {
        state: {
          amount: amount,
          projectName: projectName,
          creatorName: creatorName,
          isAnonymous: isAnonymous,
        },
      });
    }
  };

  const currentAmount = selectedAmount || (customAmount ? parseFloat(customAmount) : null);

  return (
    <div className="min-h-screen bg-[#F9FAFB] relative">
      {/* Logo at top-left */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center gap-2 hover:scale-105 transition-transform duration-300 z-10"
      >
        <img src={logo} alt="FundVerse Logo" className="h-10 w-auto" />
      </Link>

      {/* Top Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center h-16">
            <Link
              to="/discover"
              className="text-[#111827] hover:text-[#2563EB] transition-colors font-medium"
            >
              Back to Discover
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-fundverseGrayDark mb-2">Support This Project</h1>
            
            {/* Campaign Info */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold text-fundverseGrayDark mb-2">{projectName}</h2>
              <p className="text-mutedText">by {creatorName}</p>
            </div>

            {/* Amount Selection */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-fundverseGrayDark mb-4">Select Contribution Amount</h3>
              
              {/* Predefined Amount Buttons */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {predefinedAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleAmountSelect(amount)}
                    className={`px-6 py-4 rounded-lg font-semibold transition-all ${
                      selectedAmount === amount
                        ? 'bg-fundverse-gradient text-white shadow-lg transform scale-105'
                        : 'bg-fundverseBgLight text-fundverseBlue hover:bg-fundverseGrayLight border-2 border-fundverseGrayLight'
                    }`}
                  >
                    ₹{amount.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>

              {/* Custom Amount Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-fundverseGrayDark mb-2">
                  Or enter a custom amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-mutedText font-semibold">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    placeholder="Enter amount"
                    min="1"
                    className="w-full pl-8 pr-4 py-3 border-2 border-fundverseGrayLight rounded-lg focus:outline-none focus:ring-2 focus:ring-fundverseOrange focus:border-transparent"
                  />
                </div>
              </div>

              {/* Anonymous Checkbox */}
              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-5 h-5 text-fundverseOrange border-fundverseGrayLight rounded focus:ring-fundverseOrange"
                />
                <label htmlFor="anonymous" className="ml-3 text-fundverseGrayDark">
                  Make this contribution anonymous
                </label>
              </div>

              {/* Continue Button */}
              <button
                onClick={handleContinue}
                disabled={!currentAmount || currentAmount <= 0}
                    className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
                  currentAmount && currentAmount > 0
                    ? 'bg-fundverse-gradient text-white hover:opacity-90 shadow-lg hover:shadow-xl'
                    : 'bg-fundverseGrayLight text-mutedText cursor-not-allowed'
                }`}
              >
                Continue to Payment
              </button>
            </div>

            {/* Additional Info */}
            <div className="bg-fundverseBgLight border border-fundverseGrayLight rounded-lg p-4">
              <p className="text-sm text-fundverseGrayDark">
                <strong>Note:</strong> Your contribution helps bring innovative ideas to life. 
                All payments are secure and processed through our trusted payment partners.
              </p>
            </div>
          </div>

          {/* Side Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-fundverseGrayDark mb-4">Contribution Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-mutedText mb-1">Campaign</p>
                  <p className="font-semibold text-fundverseGrayDark">{projectName}</p>
                </div>
                
                <div>
                  <p className="text-sm text-mutedText mb-1">Creator</p>
                  <p className="font-semibold text-fundverseGrayDark">{creatorName}</p>
                </div>
                
                <div className="border-t border-fundverseGrayLight pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-mutedText">Contribution Amount</p>
                    <p className="text-2xl font-bold text-fundverseGrayDark">
                      {currentAmount ? `₹${currentAmount.toLocaleString('en-IN')}` : '₹0'}
                    </p>
                  </div>
                  
                  {isAnonymous && (
                    <p className="text-xs text-mutedText italic">Anonymous contribution</p>
                  )}
                </div>
              </div>

              {/* Benefits */}
              <div className="border-t border-fundverseGrayLight pt-4">
                <p className="text-sm font-semibold text-fundverseGrayDark mb-2">What you get:</p>
                <ul className="space-y-2 text-sm text-mutedText">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-fundverseSuccess mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Early access to updates</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Recognition on project page</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Support innovation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportAmount;

