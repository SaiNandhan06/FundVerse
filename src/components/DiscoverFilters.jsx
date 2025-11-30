import { useSearch } from '../context/SearchContext';

function DiscoverFilters() {
  const { searchQuery, setSearchQuery, category, setCategory, sortBy, setSortBy } = useSearch();

  return (
    <div className="filter-panel">
      <div className="filter-row">
        {/* Search Input */}
        <div className="flex-1 w-full md:w-auto">
          <div className="relative">
            <div className="search-icon">
              <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-search"
            />
          </div>
        </div>

        {/* Category Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select-input"
        >
          <option>All Categories</option>
          <option>Technology</option>
          <option>Healthcare</option>
          <option>Education</option>
          <option>Environment</option>
          <option>Social Impact</option>
          <option>Arts & Culture</option>
        </select>

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="select-input md:w-40"
        >
          <option>Trending</option>
          <option>Newest</option>
          <option>Most Funded</option>
          <option>Ending Soon</option>
          <option>Most Backers</option>
        </select>

        {/* More Filters Button */}
        <button className="btn-filter">More Filters</button>
      </div>
    </div>
  );
}

export default DiscoverFilters;
