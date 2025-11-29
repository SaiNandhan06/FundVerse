# Quick Start Implementation Guide

This guide shows you exactly how to implement the improvements step-by-step, starting with one component as an example.

## Step-by-Step: Refactoring ProjectGrid Component

### Current State (Hardcoded)
**File:** `src/components/ProjectGrid.jsx`
- Has hardcoded `projects` array (lines 5-84)
- No data persistence
- No loading/error states

### Step 1: Create the Data Model

**File:** `src/models/Campaign.js` (Already created in guide)

### Step 2: Create the Service Layer

**File:** `src/services/data/campaigns.service.js` (See full code in IMPROVEMENT_GUIDE.md)

### Step 3: Create the Hook

**File:** `src/hooks/useCampaigns.js` (See full code in IMPROVEMENT_GUIDE.md)

### Step 4: Update ProjectGrid Component

**Replace the entire content of `src/components/ProjectGrid.jsx`:**

```javascript
import { useCampaigns } from '../hooks/useCampaigns';
import ProjectCard from './ProjectCard';
import { useState } from 'react';

function ProjectGrid({ filters = {} }) {
  const { campaigns, loading, error, refetch } = useCampaigns(filters);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3B82F6]"></div>
        <span className="ml-3 text-[#6B7280]">Loading campaigns...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
        <p className="font-semibold">Error loading campaigns</p>
        <p className="text-sm">{error}</p>
        <button
          onClick={refetch}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#6B7280] text-lg mb-4">No campaigns found</p>
        <p className="text-[#6B7280] text-sm">
          {filters.search ? 'Try adjusting your search filters' : 'Be the first to create a campaign!'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {campaigns.map((project) => {
        const fundedPercent = project.targetAmount > 0
          ? Math.round((project.raised / project.targetAmount) * 100)
          : 0;
        
        const daysLeft = project.deadline
          ? Math.max(0, Math.ceil((new Date(project.deadline) - new Date()) / (1000 * 60 * 60 * 24)))
          : 0;

        return (
          <ProjectCard
            key={project.id}
            projectId={project.id}
            image={project.images?.cover}
            category={project.category}
            title={project.campaignTitle}
            description={project.description}
            creator={project.creator?.name || 'Unknown'}
            raised={`₹${project.raised.toLocaleString('en-IN')}`}
            goal={`₹${project.targetAmount.toLocaleString('en-IN')}`}
            fundedPercent={fundedPercent.toString()}
            backers={project.backers.toString()}
            daysLeft={daysLeft.toString()}
          />
        );
      })}
    </div>
  );
}

export default ProjectGrid;
```

### Step 5: Update Discover Page to Pass Filters

**File:** `src/pages/Discover.jsx` - Update to pass filters:

```javascript
import DiscoverFilters from '../components/DiscoverFilters';
import ProjectGrid from '../components/ProjectGrid';
import { useState } from 'react';

function Discover() {
  const [filters, setFilters] = useState({
    search: '',
    category: 'All Categories',
    sortBy: 'Trending',
  });

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
          <DiscoverFilters filters={filters} onFiltersChange={setFilters} />

          {/* Project Grid */}
          <ProjectGrid filters={filters} />
        </div>
      </div>
    </div>
  );
}

export default Discover;
```

### Step 6: Update DiscoverFilters to be Controlled

**File:** `src/components/DiscoverFilters.jsx` - Make it controlled:

```javascript
function DiscoverFilters({ filters, onFiltersChange }) {
  const handleChange = (field, value) => {
    onFiltersChange({
      ...filters,
      [field]: value,
    });
  };

  return (
    <div className="bg-[#FFFFFF] rounded-lg shadow-sm border border-[#E5E7EB] p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Search Input */}
        <div className="flex-1 w-full md:w-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search campaigns..."
              value={filters.search || ''}
              onChange={(e) => handleChange('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-[#111827]"
            />
          </div>
        </div>

        {/* Category Dropdown */}
        <div className="w-full md:w-auto">
          <select
            value={filters.category || 'All Categories'}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full md:w-48 px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-[#111827] bg-white"
          >
            <option>All Categories</option>
            <option>Technology</option>
            <option>Healthcare</option>
            <option>Education</option>
            <option>Environment</option>
            <option>Social Impact</option>
            <option>Arts & Culture</option>
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="w-full md:w-auto">
          <select
            value={filters.sortBy || 'Trending'}
            onChange={(e) => handleChange('sortBy', e.target.value)}
            className="w-full md:w-40 px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-[#111827] bg-white"
          >
            <option>Trending</option>
            <option>Newest</option>
            <option>Most Funded</option>
            <option>Ending Soon</option>
            <option>Most Backers</option>
          </select>
        </div>

        {/* More Filters Button */}
        <button className="w-full md:w-auto px-4 py-2 border-2 border-[#E5E7EB] text-[#111827] rounded-lg font-medium hover:bg-[#3B82F6] hover:text-white hover:border-[#3B82F6] transition-colors">
          More Filters
        </button>
      </div>
    </div>
  );
}

export default DiscoverFilters;
```

## Testing the Changes

1. **Start the dev server:**
```bash
npm run dev
```

2. **Check localStorage:**
   - Open browser DevTools → Application → Local Storage
   - You should see `fundverse_campaigns` key (empty initially)

3. **Create a campaign:**
   - Go to `/create/form`
   - Fill out the form
   - Submit
   - Check localStorage - you should see the campaign data

4. **View campaigns:**
   - Go to `/discover`
   - You should see your created campaign

## Next Steps

1. Implement the remaining services (users, payments)
2. Refactor other components following the same pattern
3. Add error boundaries
4. Add loading skeletons
5. Implement search and filter functionality

## Common Issues & Solutions

**Issue:** "Cannot find module '../hooks/useCampaigns'"
- **Solution:** Make sure you've created all the service files first (see IMPROVEMENT_GUIDE.md)

**Issue:** "localStorage is not available"
- **Solution:** This is normal in some environments. The service handles it gracefully.

**Issue:** Data not persisting
- **Solution:** Check browser console for errors. Ensure storageService.set() is being called.

**Issue:** Components not updating after data change
- **Solution:** Make sure you're using the hook's refetch function or the state updates properly.

