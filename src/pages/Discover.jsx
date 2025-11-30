import DiscoverFilters from '../components/DiscoverFilters';
import ProjectGrid from '../components/ProjectGrid';

function Discover() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="section">
        <div className="container-main">
          {/* Header */}
          <div className="page-header">
            <h1 className="page-title">Explore Campaigns</h1>
            <p className="page-description">
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
