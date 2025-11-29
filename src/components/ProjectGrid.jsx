import ProjectCard from './ProjectCard';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { campaignsService } from '../services/data/campaigns.service';
import { STORAGE_KEYS } from '../services/storage/storageKeys';

function ProjectGrid() {
  const [projects, setProjects] = useState([]);
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Get current user to check ownership
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
  }, [location.pathname]); // Reload when navigating to discover page

  const loadProjects = async () => {
    try {
      const allCampaigns = await campaignsService.getAll();
      
      // Convert campaigns to project format
      const formattedProjects = allCampaigns.map(campaign => {
        // Handle image - check both coverImage and images.cover
        // Campaign model stores it in images.cover, but we might have coverImage too
        let image = null;
        if (campaign.images && campaign.images.cover) {
          image = campaign.images.cover;
        } else if (campaign.coverImage) {
          image = campaign.coverImage;
        }
        
        return {
          id: campaign.id,
          image: image,
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
        };
      });

      // Add 3 dummy projects if we have less than 3 total
      const dummyProjects = [
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

      // Always show all user campaigns + exactly 3 dummy projects
      // User campaigns first, then 3 dummies
      const combined = [...formattedProjects, ...dummyProjects];
      setProjects(combined);
    } catch (error) {
      console.error('Error loading projects:', error);
      // Fallback to dummy projects
      setProjects([
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
      ]);
    }
  };

  const handleDelete = (deletedId) => {
    // Remove the deleted project from the list
    setProjects(projects.filter(p => p.id !== deletedId));
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => {
        // Check if current user owns this project
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
  );
}

export default ProjectGrid;
