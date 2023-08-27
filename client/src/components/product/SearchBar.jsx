import { InputAdornment, TextField } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [isFocused, setIsFocused] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <>
      <TextField
        placeholder="Search for products"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          width: {
            md: isFocused ? '70%' : '25%',
            sm: isFocused ? '75%' : '55%',
            xs: isFocused ? '75%' : '55%',
          },
          mb: { xs: 2, md: 0 },
          transition: 'width 0.3s ease-in-out',
          maxWidth: '500px',
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </>
  );
};

export default SearchBar;
