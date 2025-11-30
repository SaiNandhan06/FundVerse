import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

// Data
const HERO_STATS = [
  { value: '10,000+', label: 'Active Backers' },
  { value: '₹2.5M+', label: 'Funded Projects' }
];

const PLATFORM_STATS = [
  { value: '₹420Cr+', label: 'Total Funded' },
  { value: '10K+', label: 'Projects Launched' },
  { value: '2.5L+', label: 'Active Backers' },
  { value: '50+', label: 'Cities' }
];

const FEATURES = [
  {
    title: 'Secure & Trusted',
    description: 'Your funds and data are protected with bank-level encryption and industry-leading security measures.'
  },
  {
    title: 'Quick & Easy',
    description: 'Launch your campaign in minutes with our intuitive platform. From setup to funding, we\'ve streamlined every step.'
  },
  {
    title: 'Community Driven',
    description: 'Join a vibrant community of creators and backers. Get support, share ideas, and connect with people who believe in your vision.'
  }
];

function Home() {
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsStatsVisible(true),
      { threshold: 0.1 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => statsRef.current && observer.unobserve(statsRef.current);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="section-hero">
        <div className="container-main">
          <div className="grid-2">
            {/* Hero Text */}
            <div className="animate-fade-in">
              <h1 className="heading-xl animate-slide-in">FundVerse</h1>
              <h2 className="heading-md">Where Ideas Take Flight & Futures Are Built</h2>
              <p className="text-body">
                FundVerse is India's premier crowdfunding platform where innovators, creators, and dreamers
                come together to turn visionary ideas into reality.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/discover" className="btn-primary">Explore Projects</Link>
                <Link to="/create" className="btn-outline">Start a Campaign</Link>
              </div>
            </div>

            {/* Hero Stats */}
            <div className="space-y-4">
              {HERO_STATS.map((stat, i) => (
                <div key={i} className="card-hover">
                  <div className="flex items-center gap-4">
                    <div className="icon-box">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-gray-600">{stat.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-gray-50">
        <div className="container-main">
          <div
            ref={statsRef}
            className={`grid-4 fade-slide ${isStatsVisible ? 'fade-slide-visible' : 'fade-slide-hidden'}`}
          >
            {PLATFORM_STATS.map((stat, i) => (
              <div key={i} className="stat-card">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-white">
        <div className="container-main">
          <h2 className="heading-lg">Why Choose FundVerse?</h2>
          <div className="grid-3">
            {FEATURES.map((feature, i) => (
              <div key={i} className="feature-card">
                <div className="icon-circle">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="heading-sm">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
