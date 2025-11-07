import DiscoverFilters from '../components/DiscoverFilters';
import ProjectGrid from '../components/ProjectGrid';

function Discover() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-[#111827] mb-4">
              Explore Campaigns
            </h1>
            <p className="text-lg text-[#374151] max-w-3xl">
              Discover amazing projects from creators across India and help bring innovative ideas to life.
            </p>
          </div>

          {/* Filters */}
          <DiscoverFilters />

          {/* Project Grid */}
          <ProjectGrid />
        </div>
      </div>
    </div>
  );
}

export default Discover;

