import ProjectCard from './ProjectCard';

function ProjectGrid() {
  // Sample project data - Indian context
  const projects = [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
    },
    {
      id: 4,
      image: null,
      category: 'HealthTech',
      title: 'Low-cost 3D Printed Prosthetics for Healthcare',
      description: 'Affordable 3D-printed prosthetic limbs for amputees, making healthcare accessible to all income groups.',
      creator: 'Dr. Vikram Singh',
      raised: '₹3,20,000',
      goal: '₹5,00,000',
      fundedPercent: '64.0',
      backers: '124',
      daysLeft: '30'
    },
    {
      id: 5,
      image: null,
      category: 'FinTech',
      title: 'Smart Irrigation using IoT',
      description: 'Advanced IoT-based irrigation system that automates water management for farmers, reducing water waste by 40%.',
      creator: 'Devanshi Sharma',
      raised: '₹10,50,000',
      goal: '₹12,00,000',
      fundedPercent: '87.5',
      backers: '421',
      daysLeft: '8'
    },
    {
      id: 6,
      image: null,
      category: 'Social Impact',
      title: 'Handloom Revival Project',
      description: 'Supporting traditional handloom weavers by connecting them with modern markets and preserving India\'s rich textile heritage.',
      creator: 'Priya Menon',
      raised: '₹2,15,000',
      goal: '₹4,00,000',
      fundedPercent: '53.8',
      backers: '98',
      daysLeft: '22'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
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
        />
      ))}
    </div>
  );
}

export default ProjectGrid;
