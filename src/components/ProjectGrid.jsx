import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import { useSearch } from '../context/SearchContext';
import { campaignsService } from '../services/data/campaigns.service';
import { STORAGE_KEYS } from '../services/storage/storageKeys';

// Dummy projects data
const DUMMY_PROJECTS = [
  {
    id: 'dummy-1',
    image: null,
    category: 'AgriTech',
    title: 'AI-Powered Soil Health Scanner for Farmers',
    description: 'Revolutionary IoT device that analyzes soil health in real-time, helping farmers optimize crop yields and reduce fertilizer costs.',
    creator: 'Dr. Riya Iyer',
    raised: '₹8,50,000',
    goal: '₹12,00,000',
    fundedPercent: '70.8',
    backers: '342',
    daysLeft: '18'
  },
  {
    id: 'dummy-2',
    image: null,
    category: 'Renewable Energy',
    title: 'Community Solar Light Project for Rural Areas',
    description: 'Affordable solar energy solutions for rural communities, bringing clean power to underserved villages across India.',
    creator: 'Arjun Patel',
    raised: '₹6,25,000',
    goal: '₹10,00,000',
    fundedPercent: '62.5',
    backers: '218',
    daysLeft: '25'
  },
  {
    id: 'dummy-3',
    image: null,
    category: 'EdTech',
    title: 'Digital Literacy Program for Rural Youth',
    description: 'Comprehensive online learning platform offering courses in technology, business, and digital skills for rural students.',
    creator: 'Kavya Reddy',
    raised: '₹4,50,000',
    goal: '₹7,50,000',
    fundedPercent: '60.0',
    backers: '156',
    daysLeft: '12'
  }
];

function ProjectGrid() {
  const [projects, setProjects] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const { searchQuery, category, sortBy } = useSearch();
  const location = useLocation();

  useEffect(() => {
    const userStr = sessionStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (userStr) {
      try {
        setCurrentUser(JSON.parse(userStr));
      } catch (error) {
        console.error('Error parsing user:', error);
      }
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [location.pathname]);

  const loadProjects = async () => {
    try {
      const allCampaigns = await campaignsService.getAll();

      // Filter out pending campaigns - only show approved ones
      const approvedCampaigns = allCampaigns.filter(campaign =>
        campaign.status === 'approved' || campaign.status === 'Active'
      );

      const formattedProjects = approvedCampaigns.map(campaign => ({
        id: campaign.id,
        image: campaign.images?.cover || campaign.coverImage || null,
        category: campaign.category || 'Others',
        title: campaign.campaignTitle || campaign.title || 'Untitled Campaign',
        description: campaign.description || campaign.campaignTagline || '',
        creator: campaign.creator?.name || campaign.creatorName || 'Anonymous',
        creatorEmail: campaign.creator?.email || campaign.email || '',
        creatorId: campaign.creator?.id || null,
        raised: `₹${(campaign.raised || 0).toLocaleString('en-IN')}`,
        goal: `₹${(campaign.targetAmount || 0).toLocaleString('en-IN')}`,
        fundedPercent: campaign.targetAmount > 0
          ? ((campaign.raised || 0) / campaign.targetAmount * 100).toFixed(1)
          : '0',
        backers: (campaign.backers || 0).toString(),
        daysLeft: campaign.deadline
          ? Math.max(0, Math.ceil((new Date(campaign.deadline) - new Date()) / (1000 * 60 * 60 * 24))).toString()
          : '0'
      }));

      setProjects([...formattedProjects, ...DUMMY_PROJECTS]);
    } catch (error) {
      console.error('Error loading projects:', error);
      setProjects(DUMMY_PROJECTS);
    }
  };

  const handleDelete = (deletedId) => {
    setProjects(projects.filter(p => p.id !== deletedId));
  };

  // Filter projects based on search query and category
  const filteredProjects = projects.filter(project => {
    const matchesSearch = searchQuery === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.creator.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = category === 'All Categories' || project.category === category;

    return matchesSearch && matchesCategory;
  });

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'Newest':
        return b.id.localeCompare(a.id);
      case 'Most Funded':
        return parseFloat(b.fundedPercent) - parseFloat(a.fundedPercent);
      case 'Ending Soon':
        return parseInt(a.daysLeft) - parseInt(b.daysLeft);
      case 'Most Backers':
        return parseInt(b.backers) - parseInt(a.backers);
      default: // Trending
        return parseFloat(b.fundedPercent) - parseFloat(a.fundedPercent);
    }
  });

  return (
    <>
      {/* Results count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">{sortedProjects.length}</span> campaigns found
        </p>
      </div>

      {/* Projects grid */}
      <div className="grid-projects">
        {sortedProjects.map((project) => {
          const isOwner = currentUser &&
            !project.id?.startsWith('dummy-') &&
            (project.creatorEmail === currentUser.email ||
              project.creatorId === currentUser.id);

          return (
            <ProjectCard
              key={project.id}
              projectId={project.id}
              image={project.image}
              category={project.category}
              title={project.title}
              description={project.description}
              creator={project.creator}
              raised={project.raised}
              goal={project.goal}
              fundedPercent={project.fundedPercent}
              backers={project.backers}
              daysLeft={project.daysLeft}
              isOwner={isOwner}
              onDelete={handleDelete}
            />
          );
        })}
      </div>

      {/* No results message */}
      {sortedProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No campaigns found matching your criteria.</p>
          <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </>
  );
}

export default ProjectGrid;
