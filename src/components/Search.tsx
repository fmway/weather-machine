import React, { useState } from 'react';
import '../css/Search.css';

interface SearchProps {
  onSearch: (city: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className="weather-search" onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Search for a city..."
        className="search-input"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button type="submit" className="search-button">
        <span className="search-icon">🔍</span>
        Search
      </button>
    </form>
  );
}

export default Search;
