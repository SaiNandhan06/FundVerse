import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export function SearchProvider({ children }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('All Categories');
    const [sortBy, setSortBy] = useState('Trending');

    return (
        <SearchContext.Provider value={{ searchQuery, setSearchQuery, category, setCategory, sortBy, setSortBy }}>
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within SearchProvider');
    }
    return context;
}
