import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import Accordion from '../components/Accordion';
import Button from '../components/Button';
import { campaignsService } from '../services/data/campaigns.service';

function CampaignDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('story');
  const [liked, setLiked] = useState(false);
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dummy campaign data for different projects
  const dummyCampaigns = {
    'dummy-1': {
      title: "AI-Powered Soil Health Scanner for Farmers",
      description: "Revolutionary IoT device that analyzes soil health in real-time, helping Indian farmers optimize crop yields and reduce fertilizer costs.",
      creator: {
        name: "Dr. Riya Iyer",
        avatar: "RI",
        verified: true,
        location: "Chennai, Tamil Nadu"
      },
      stats: {
        raised: 850000,
        goal: 1200000,
        backers: 342,
        daysLeft: 18
      },
      supportTiers: [
        { amount: 500, title: "Early Supporter", benefits: ["Thank you message", "Project updates"] },
        { amount: 1000, title: "Backer", benefits: ["All previous", "Early access", "Digital rewards"] },
        { amount: 2500, title: "VIP Backer", benefits: ["All previous", "Exclusive content", "Beta access"] },
        { amount: 5000, title: "Premium Supporter", benefits: ["All previous", "1-on-1 consultation", "Lifetime access"] }
      ],
      recentBackers: [
        { name: "Arjun P.", amount: 5000, time: "2 hours ago" },
        { name: "Kavya R.", amount: 1000, time: "5 hours ago" },
        { name: "Vikram S.", amount: 10000, time: "1 day ago" },
        { name: "Priya M.", amount: 2500, time: "2 days ago" }
      ],
      story: "Our journey began when we recognized a critical gap in agricultural technology for Indian farmers. Despite advances in farming techniques, millions of farmers across India struggle to optimize crop yields and manage soil health effectively. This IoT device leverages artificial intelligence to analyze soil health in real-time, helping farmers make data-driven decisions about irrigation, fertilization, and crop selection. We're building a future where technology empowers every farmer in India.",
      team: ['Dr. Riya Iyer', 'Arjun Patel', 'Kavya Reddy', 'Vikram Singh']
    },
    'dummy-2': {
      title: "Community Solar Light Project for Rural Areas",
      description: "Affordable solar energy solutions for rural communities, bringing clean power to underserved villages across India.",
      creator: {
        name: "Arjun Patel",
        avatar: "AP",
        verified: true,
        location: "Mumbai, Maharashtra"
      },
      stats: {
        raised: 625000,
        goal: 1000000,
        backers: 218,
        daysLeft: 25
      },
      supportTiers: [
        { amount: 300, title: "Supporter", benefits: ["Thank you message", "Project updates"] },
        { amount: 750, title: "Community Member", benefits: ["All previous", "Solar light for one family", "Project recognition"] },
        { amount: 1500, title: "Village Sponsor", benefits: ["All previous", "Solar lights for 5 families", "Naming rights"] },
        { amount: 3000, title: "Community Leader", benefits: ["All previous", "Solar installation in your name", "Lifetime updates"] }
      ],
      recentBackers: [
        { name: "Rahul K.", amount: 3000, time: "1 hour ago" },
        { name: "Sneha M.", amount: 750, time: "3 hours ago" },
        { name: "Amit S.", amount: 1500, time: "1 day ago" },
        { name: "Neha P.", amount: 300, time: "2 days ago" }
      ],
      story: "Access to reliable electricity is a fundamental right, yet millions in rural India live without it. Our solar light project aims to bring clean, affordable energy to underserved communities. We work directly with village councils to install solar-powered lighting systems that improve quality of life, enable children to study after dark, and support small businesses. Together, we can light up India, one village at a time.",
      team: ['Arjun Patel', 'Meera Desai', 'Rajesh Kumar', 'Sunita Nair']
    },
    'dummy-3': {
      title: "Digital Literacy Program for Rural Youth",
      description: "Comprehensive online learning platform offering courses in technology, business, and digital skills for rural students.",
      creator: {
        name: "Kavya Reddy",
        avatar: "KR",
        verified: true,
        location: "Hyderabad, Telangana"
      },
      stats: {
        raised: 450000,
        goal: 750000,
        backers: 156,
        daysLeft: 12
      },
      supportTiers: [
        { amount: 400, title: "Student Supporter", benefits: ["Thank you message", "Course updates"] },
        { amount: 1000, title: "Education Sponsor", benefits: ["All previous", "Sponsor one student's course", "Recognition"] },
        { amount: 2500, title: "School Partner", benefits: ["All previous", "Sponsor 5 students", "School recognition"] },
        { amount: 5000, title: "Community Educator", benefits: ["All previous", "Sponsor entire class", "Naming rights"] }
      ],
      recentBackers: [
        { name: "Anjali T.", amount: 2500, time: "4 hours ago" },
        { name: "Rohit D.", amount: 1000, time: "6 hours ago" },
        { name: "Pooja S.", amount: 5000, time: "1 day ago" },
        { name: "Kiran M.", amount: 400, time: "3 days ago" }
      ],
      story: "Education is the key to unlocking potential, but rural students often lack access to quality digital learning resources. Our platform provides comprehensive courses in technology, business skills, and digital literacy, designed specifically for rural youth. We partner with local schools and community centers to ensure every student has the opportunity to learn and grow. Join us in bridging the digital divide and empowering the next generation.",
      team: ['Kavya Reddy', 'Suresh Iyer', 'Lakshmi Menon', 'Vikram Rao']
    }
  };

  useEffect(() => {
    loadCampaign();
  }, [id]);

  const loadCampaign = async () => {
    setLoading(true);
    try {
      // Check if it's a dummy campaign
      if (id && dummyCampaigns[id]) {
        setCampaign(dummyCampaigns[id]);
      } else {
        // Try to load from localStorage
        const loadedCampaign = await campaignsService.getById(id);
        if (loadedCampaign) {
          setCampaign({
            title: loadedCampaign.campaignTitle || loadedCampaign.title,
            description: loadedCampaign.description || loadedCampaign.campaignTagline,
            creator: {
              name: loadedCampaign.creator?.name || loadedCampaign.creatorName || 'Anonymous',
              avatar: (loadedCampaign.creator?.name || 'A').split(' ').map(n => n[0]).join('').substring(0, 2),
              verified: false,
              location: `${loadedCampaign.creator?.city || ''}, ${loadedCampaign.creator?.state || ''}`.trim()
            },
            stats: {
              raised: loadedCampaign.raised || 0,
              goal: loadedCampaign.targetAmount || 0,
              backers: loadedCampaign.backers || 0,
              daysLeft: loadedCampaign.getDaysLeft ? loadedCampaign.getDaysLeft() : 0
            },
            supportTiers: [
              { amount: loadedCampaign.minimumContribution || 500, title: "Supporter", benefits: ["Thank you message", "Project updates"] },
              { amount: (loadedCampaign.minimumContribution || 500) * 2, title: "Backer", benefits: ["All previous", "Early access"] },
              { amount: (loadedCampaign.minimumContribution || 500) * 5, title: "VIP Backer", benefits: ["All previous", "Exclusive content"] }
            ],
            recentBackers: [],
            story: loadedCampaign.description || '',
            team: [loadedCampaign.creator?.name || 'Anonymous']
          });
        } else {
          // Default to first dummy if not found
          setCampaign(dummyCampaigns['dummy-1']);
        }
      }
    } catch (error) {
      console.error('Error loading campaign:', error);
      setCampaign(dummyCampaigns['dummy-1']);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !campaign) {
    return (
      <div className="min-h-screen bg-fundverseBg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fundverseBlue mx-auto mb-4"></div>
          <p className="text-fundverseBody">Loading campaign...</p>
        </div>
      </div>
    );
  }

  const fundedPercent = Math.round((campaign.stats.raised / campaign.stats.goal) * 100);

  const tabs = ['story', 'team', 'timeline', 'budget', 'updates', 'faqs'];

  return (
    <div className="min-h-screen bg-fundverseBg">
      {/* Hero Section */}
      <section className="bg-fundverse-gradient text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{campaign.title}</h1>
              <p className="text-xl text-blue-100 mb-6">{campaign.description}</p>
              
              {/* Creator Info */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center font-bold text-lg">
                  {campaign.creator.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{campaign.creator.name}</span>
                    {campaign.creator.verified && (
                      <svg className="w-5 h-5 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <p className="text-sm text-blue-200">Campaign Creator</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <p className="text-sm text-blue-200">Amount Raised</p>
                  <p className="text-2xl font-bold">₹{campaign.stats.raised.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-200">Goal</p>
                  <p className="text-2xl font-bold">₹{campaign.stats.goal.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-200">Backers</p>
                  <p className="text-2xl font-bold">{campaign.stats.backers}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-200">Days Left</p>
                  <p className="text-2xl font-bold">{campaign.stats.daysLeft}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <ProgressBar value={fundedPercent} />
                <p className="text-sm text-blue-200 mt-2">{fundedPercent}% funded</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link to="/support" state={{ projectName: campaign.title, creatorName: campaign.creator.name }}>
                  <Button variant="primary" size="lg">
                    Support This Project
                  </Button>
                </Link>
                <button
                  onClick={() => setLiked(!liked)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors border-2 ${
                    liked
                      ? 'bg-red-500 border-red-500 text-white'
                      : 'bg-transparent border-white text-white hover:bg-white hover:text-fundverseBlue'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill={liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Like
                  </span>
                </button>
                <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-fundverseBlue transition-colors">
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Section */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-md mb-6">
              <div className="border-b border-fundverseBorder">
                <div className="flex overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-4 font-medium text-sm capitalize transition-colors border-b-2 ${
                        activeTab === tab
                          ? 'border-fundverseBlue text-fundverseBlue'
                          : 'border-transparent text-fundverseBody hover:text-fundverseHeading'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'story' && (
                  <div>
                    <h3 className="text-2xl font-bold text-fundverseHeading mb-4">The Story</h3>
                    <p className="text-fundverseBody mb-4 whitespace-pre-line">
                      {campaign.story || campaign.description}
                    </p>
                  </div>
                )}

                {activeTab === 'team' && (
                  <div>
                    <h3 className="text-2xl font-bold text-fundverseHeading mb-4">Our Team</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(campaign.team || [campaign.creator.name]).map((member) => (
                        <div key={member} className="border border-fundverseBorder rounded-lg p-4">
                          <div className="w-16 h-16 bg-fundverse-gradient rounded-full flex items-center justify-center text-white font-bold text-xl mb-3">
                            {member.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </div>
                          <h4 className="font-semibold text-fundverseHeading">{member}</h4>
                          <p className="text-sm text-fundverseMuted">Team Member</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'timeline' && (
                  <div>
                    <h3 className="text-2xl font-bold text-fundverseHeading mb-4">Project Timeline</h3>
                    <div className="space-y-4">
                      {[
                        { month: 'Month 1-2', task: 'Platform Development & Testing' },
                        { month: 'Month 3-4', task: 'Beta Launch & User Feedback' },
                        { month: 'Month 5-6', task: 'Full Launch & Marketing' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="flex-shrink-0 w-24 text-fundverseMuted font-medium">{item.month}</div>
                          <div className="flex-1 border-l-2 border-fundverseBorder pl-4 pb-4">
                            <p className="text-fundverseBody">{item.task}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'budget' && (
                  <div>
                    <h3 className="text-2xl font-bold text-fundverseHeading mb-4">Budget Breakdown</h3>
                    <div className="space-y-3">
                      {[
                        { item: 'Device Development', amount: 480000, percent: 40 },
                        { item: 'Marketing & Outreach', amount: 300000, percent: 25 },
                        { item: 'Team Salaries', amount: 240000, percent: 20 },
                        { item: 'Infrastructure & Cloud', amount: 180000, percent: 15 }
                      ].map((budget, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between mb-1">
                            <span className="text-fundverseBody">{budget.item}</span>
                            <span className="text-fundverseHeading font-semibold">₹{budget.amount.toLocaleString('en-IN')}</span>
                          </div>
                          <ProgressBar value={budget.percent} size="sm" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'updates' && (
                  <div>
                    <h3 className="text-2xl font-bold text-fundverseHeading mb-4">Project Updates</h3>
                    <div className="space-y-4">
                      {[
                        { date: '15/12/2024', title: 'Beta Testing Phase Complete', content: 'We\'ve successfully completed our beta testing phase with 500+ farmers across Tamil Nadu and Karnataka.' },
                        { date: '01/12/2024', title: 'Device Development Milestone', content: 'Core IoT device features are now functional and ready for field testing.' }
                      ].map((update, idx) => (
                        <div key={idx} className="border border-fundverseBorder rounded-lg p-4">
                          <p className="text-sm text-fundverseMuted mb-2">{update.date}</p>
                          <h4 className="font-semibold text-fundverseHeading mb-2">{update.title}</h4>
                          <p className="text-fundverseBody">{update.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'faqs' && (
                  <div>
                    <h3 className="text-2xl font-bold text-fundverseHeading mb-4">Frequently Asked Questions</h3>
                    <div className="space-y-4">
                      <Accordion title="How does the device work?" content="Our AI-powered IoT device analyzes soil health in real-time using sensors, providing farmers with instant recommendations for irrigation, fertilization, and crop selection based on soil conditions." />
                      <Accordion title="When will the device be available?" content="We're targeting device delivery within 6 months of reaching our funding goal, starting with farmers in Tamil Nadu and Karnataka." />
                      <Accordion title="What makes this different from other agricultural tools?" content="Our unique real-time soil analysis system provides instant, actionable insights directly to farmers' smartphones, making advanced agricultural technology accessible and affordable." />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Impact & Benefits */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-2xl font-bold text-fundverseHeading mb-4">Impact & Benefits</h3>
              <div className="space-y-3">
                {[
                  'Improved crop yields for Indian farmers through data-driven decisions',
                  'Reduced fertilizer costs by optimizing soil nutrient management',
                  'Enhanced water efficiency with smart irrigation recommendations',
                  'Empowering farmers across India with affordable agricultural technology'
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-fundverseSuccess flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-fundverseBody">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Gallery */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-2xl font-bold text-fundverseHeading mb-4">Project Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div key={num} className="aspect-square bg-fundverse-gradient rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    Image {num}
                  </div>
                ))}
              </div>
            </div>

            {/* Risks & Challenges */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-bold text-fundverseHeading mb-4">Risks & Challenges</h3>
              <div className="space-y-2">
                <Accordion title="Regulatory Compliance" content="We are working closely with agricultural and IoT regulatory bodies in India to ensure full compliance with data privacy and agricultural technology standards." />
                <Accordion title="Technology Scalability" content="Our IoT infrastructure is designed to scale, but rapid growth across multiple states may require additional resources and network optimization." />
                <Accordion title="Farmer Adoption" content="While we have strong initial interest from farmers in Tamil Nadu and Karnataka, widespread adoption across India will require continued outreach and farmer education programs." />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Support Tiers */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-24">
              <h3 className="text-xl font-bold text-fundverseHeading mb-4">Support Tiers</h3>
              <div className="space-y-4">
                {campaign.supportTiers.map((tier, idx) => (
                  <div key={idx} className="border border-fundverseBorder rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-2xl font-bold text-fundverseHeading">₹{tier.amount.toLocaleString('en-IN')}</span>
                      <span className="text-sm font-semibold text-fundverseBlue">{tier.title}</span>
                    </div>
                    <ul className="space-y-1 text-sm text-fundverseBody">
                      {tier.benefits.map((benefit, bidx) => (
                        <li key={bidx} className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-fundverseSuccess flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <Link to="/support" state={{ projectName: campaign.title, creatorName: campaign.creator.name }}>
                      <Button variant="primary" size="sm" className="w-full mt-3">
                        Select Tier
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Backers */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-fundverseHeading mb-4">Recent Backers</h3>
              <div className="space-y-3">
                {campaign.recentBackers.map((backer, idx) => (
                  <div key={idx} className="flex justify-between items-center pb-3 border-b border-fundverseBorder last:border-0">
                    <div>
                      <p className="font-semibold text-fundverseHeading">{backer.name}</p>
                      <p className="text-sm text-fundverseMuted">{backer.time}</p>
                    </div>
                    <p className="font-bold text-fundverseBlue">₹{backer.amount.toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignDetails;

