import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Hero Section */}
      <section 
        className="bg-gradient-to-br from-[#4F46E5] to-[#3B82F6] text-white py-20 px-4 sm:px-6 lg:px-8"
        style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-in">
                FundVerse
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-blue-100">
                Where Ideas Take Flight & Futures Are Built
              </h2>
              <p className="text-lg md:text-xl mb-8 text-blue-100 leading-relaxed">
                FundVerse is India's premier crowdfunding platform where innovators, creators, and dreamers come together to turn visionary ideas into reality. Join thousands of backers supporting groundbreaking projects across India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/discover"
                  className="px-8 py-4 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-[#1E40AF] transition-all duration-300 ease-in-out text-lg shadow-lg hover:shadow-xl text-center"
                >
                  Explore Projects
                </Link>
                <Link
                  to="/create"
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-[#3B82F6] transition-all duration-300 ease-in-out text-lg text-center"
                >
                  Start a Campaign
                </Link>
              </div>
            </div>

            {/* Right Side - Info Cards */}
            <div className="space-y-4">
              <div className="bg-[#FFFFFF] rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#4F46E5] to-[#3B82F6] rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#111827]">10,000+</p>
                    <p className="text-[#6B7280]">Active Backers</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#FFFFFF] rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#4F46E5] to-[#3B82F6] rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#111827]">₹2.5M+</p>
                    <p className="text-[#6B7280]">Funded Projects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto">
          <div 
            ref={statsRef}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Total Funded */}
            <div className="bg-[#FFFFFF] rounded-lg border border-[#E5E7EB] shadow-sm p-6 text-center hover:shadow-md hover:-translate-y-1 hover:border-[#3B82F6] transition-all duration-300 ease-in-out">
              <div className="text-4xl font-bold text-[#111827] mb-2">₹420Cr+</div>
              <div className="text-[#6B7280] text-lg">Total Funded</div>
            </div>

            {/* Projects Launched */}
            <div className="bg-[#FFFFFF] rounded-lg border border-[#E5E7EB] shadow-sm p-6 text-center hover:shadow-md hover:-translate-y-1 hover:border-[#3B82F6] transition-all duration-300 ease-in-out">
              <div className="text-4xl font-bold text-[#111827] mb-2">10K+</div>
              <div className="text-[#6B7280] text-lg">Projects Launched</div>
            </div>

            {/* Active Backers */}
            <div className="bg-[#FFFFFF] rounded-lg border border-[#E5E7EB] shadow-sm p-6 text-center hover:shadow-md hover:-translate-y-1 hover:border-[#3B82F6] transition-all duration-300 ease-in-out">
              <div className="text-4xl font-bold text-[#111827] mb-2">2.5L+</div>
              <div className="text-[#6B7280] text-lg">Active Backers</div>
            </div>

            {/* Cities */}
            <div className="bg-[#FFFFFF] rounded-lg border border-[#E5E7EB] shadow-sm p-6 text-center hover:shadow-md hover:-translate-y-1 hover:border-[#3B82F6] transition-all duration-300 ease-in-out">
              <div className="text-4xl font-bold text-[#111827] mb-2">50+</div>
              <div className="text-[#6B7280] text-lg">Cities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose FundVerse Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#111827]">
            Why Choose FundVerse?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Secure & Trusted */}
            <div className="bg-[#F9FAFB] rounded-lg p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-[#4F46E5] to-[#3B82F6] rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-center mb-4 text-[#111827]">Secure & Trusted</h3>
              <p className="text-[#6B7280] text-center">
                Your funds and data are protected with bank-level encryption and industry-leading security measures. We've built trust with thousands of successful campaigns.
              </p>
            </div>

            {/* Quick & Easy */}
            <div className="bg-[#F9FAFB] rounded-lg p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-[#4F46E5] to-[#3B82F6] rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-center mb-4 text-[#111827]">Quick & Easy</h3>
              <p className="text-[#6B7280] text-center">
                Launch your campaign in minutes with our intuitive platform. From setup to funding, we've streamlined every step to get you from idea to reality faster.
              </p>
            </div>

            {/* Community Driven */}
            <div className="bg-[#F9FAFB] rounded-lg p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-[#4F46E5] to-[#3B82F6] rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-center mb-4 text-[#111827]">Community Driven</h3>
              <p className="text-[#6B7280] text-center">
                Join a vibrant community of creators and backers. Get support, share ideas, and connect with people who believe in your vision.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
