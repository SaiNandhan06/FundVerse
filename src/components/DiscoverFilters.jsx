import { useState } from 'react';

function DiscoverFilters() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('Trending');

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-[#111827]"
            />
          </div>
        </div>

        {/* Category Dropdown */}
        <div className="w-full md:w-auto">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
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

        {/* Results Count */}
        <div className="w-full md:w-auto text-right md:text-left">
          <p className="text-sm text-[#6B7280]">
            <span className="font-semibold text-[#111827]">6</span> campaigns found
          </p>
        </div>
      </div>
    </div>
  );
}

export default DiscoverFilters;

