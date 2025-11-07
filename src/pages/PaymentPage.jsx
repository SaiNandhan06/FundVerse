import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../assets/my-logo.png.png';

function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get payment info from location state
  const amount = location.state?.amount || 0;
  const projectName = location.state?.projectName || 'AI-Powered Soil Health Scanner';
  const creatorName = location.state?.creatorName || 'Dr. Riya Iyer';
  const isAnonymous = location.state?.isAnonymous || false;

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const platformFee = amount * 0.05; // 5% platform fee
  const total = amount + platformFee;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s/g, '');
    if (value.length <= 16) {
      value = value.match(/.{1,4}/g)?.join(' ') || value;
      setFormData({
        ...formData,
        cardNumber: value,
      });
    }
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      value = value.match(/.{1,2}/g)?.join('/') || value;
      setFormData({
        ...formData,
        expiry: value,
      });
    }
  };

  const handleCvcChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setFormData({
        ...formData,
        cvc: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Fake confirmation alert
    alert('Payment Successful!');
    // Navigate back to dashboard
    navigate('/company/dashboard');
  };

  const handleBack = () => {
    navigate('/support', {
      state: {
        projectName: projectName,
        creatorName: creatorName,
        isAnonymous: isAnonymous,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Gradient Header */}
      <div 
        className="bg-gradient-to-b from-[#EEF2FF] to-[#DBEAFE] py-4"
        style={{ background: 'linear-gradient(180deg, #EEF2FF 0%, #DBEAFE 100%)' }}
      >
        {/* Top Navbar */}
        <nav className="bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center hover:scale-105 transition-transform duration-300">
                <img src={logo} alt="FundVerse Logo" className="h-10 w-auto" />
              </Link>
              <button
                onClick={handleBack}
                className="text-[#111827] hover:text-[#2563EB] transition-colors flex items-center gap-2 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
              </button>
            </div>
          </div>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-[#111827] mb-8">Complete Your Payment</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Information Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#FFFFFF] rounded-lg shadow-md p-6 border border-[#E5E7EB]">
              <h2 className="text-xl font-semibold text-[#111827] mb-6">Payment Information</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-[#111827] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-[#111827]"
                    placeholder="Arjun Patel"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#111827] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-[#111827]"
                    placeholder="arjun.patel@example.com"
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Payment Method
                  </label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`flex-1 px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                        paymentMethod === 'card'
                          ? 'border-[#3B82F6] bg-[#3B82F6] text-white hover:bg-[#2563EB]'
                          : 'border-[#E5E7EB] text-[#111827] hover:border-[#3B82F6] hover:text-[#3B82F6]'
                      }`}
                    >
                      Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`flex-1 px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                        paymentMethod === 'upi'
                          ? 'border-[#3B82F6] bg-[#3B82F6] text-white hover:bg-[#2563EB]'
                          : 'border-[#E5E7EB] text-[#111827] hover:border-[#3B82F6] hover:text-[#3B82F6]'
                      }`}
                    >
                      UPI
                    </button>
                  </div>
                </div>

                {/* Card Details (shown only if card is selected) */}
                {paymentMethod === 'card' && (
                  <>
                    {/* Card Number */}
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-[#111827] mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleCardNumberChange}
                        required
                        maxLength="19"
                        className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-[#111827]"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>

                    {/* Expiry and CVC */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry" className="block text-sm font-medium text-[#111827] mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          id="expiry"
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleExpiryChange}
                          required
                          maxLength="5"
                          className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-[#111827]"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label htmlFor="cvc" className="block text-sm font-medium text-[#111827] mb-2">
                          CVC
                        </label>
                        <input
                          type="text"
                          id="cvc"
                          name="cvc"
                          value={formData.cvc}
                          onChange={handleCvcChange}
                          required
                          maxLength="3"
                          className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-[#111827]"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* UPI ID (shown only if UPI is selected) */}
                {paymentMethod === 'upi' && (
                  <div>
                    <label htmlFor="upiId" className="block text-sm font-medium text-[#111827] mb-2">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      id="upiId"
                      name="upiId"
                      required
                      className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-[#111827]"
                      placeholder="yourname@paytm or yourname@phonepe"
                    />
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#3B82F6] text-white py-3 rounded-lg font-semibold hover:bg-[#2563EB] transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
                >
                  Review & Pay
                </button>
              </form>
            </div>
          </div>

          {/* Support Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-[#FFFFFF] rounded-lg shadow-md p-6 border border-[#E5E7EB] sticky top-24">
              <h3 className="text-lg font-semibold text-[#111827] mb-6">Support Summary</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Campaign</p>
                  <p className="font-semibold text-[#111827]">{projectName}</p>
                </div>

                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Creator</p>
                  <p className="font-semibold text-[#111827]">{creatorName}</p>
                </div>

                <div className="border-t border-[#E5E7EB] pt-4 space-y-3">
                  <div className="flex justify-between">
                    <p className="text-sm text-[#6B7280]">Contribution</p>
                    <p className="font-semibold text-[#111827]">₹{amount.toLocaleString('en-IN')}</p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-sm text-[#6B7280]">Platform Fee (5%)</p>
                    <p className="font-semibold text-[#111827]">₹{platformFee.toLocaleString('en-IN')}</p>
                  </div>

                  <div className="border-t border-[#E5E7EB] pt-3 flex justify-between">
                    <p className="text-lg font-semibold text-[#111827]">Total</p>
                    <p className="text-xl font-bold text-[#3B82F6]">₹{total.toLocaleString('en-IN')}</p>
                  </div>
                </div>

                {isAnonymous && (
                  <p className="text-xs text-[#6B7280] italic">Anonymous contribution</p>
                )}
              </div>

              {/* Security Info */}
              <div className="border-t border-[#E5E7EB] pt-4">
                <div className="flex items-start text-sm text-[#6B7280]">
                  <svg className="w-5 h-5 text-[#10B981] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <p>Your payment is secure and encrypted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
