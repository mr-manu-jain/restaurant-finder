import React, { useState } from 'react';
import { Input, InputGroup, InputRightElement, Button, HStack, InputLeftElement } from '@chakra-ui/react';
import { CloseIcon, SearchIcon } from '@chakra-ui/icons';

const SearchBar = ({ onSearch, onReset }) => {
  const [query, setQuery] = useState('');

  const handleClear = () => {
    setQuery('');
  };

  const handleSearch = () => {
   
      onSearch(query);
    
  };

  return (
    <HStack spacing={4} alignItems="center">
         <InputGroup size="md" maxWidth="400px" mx="auto" borderRadius="full">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              borderRadius="full"
              bgColor="white"
            />
            
            {query && (
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleSearch}>
                  <SearchIcon />
                </Button>
              </InputRightElement>
            )}
        </InputGroup>
          {onReset && ( // Conditionally render Reset button if onReset is provided
            <Button onClick={onReset} colorScheme="red">
              Reset
            </Button>
          )}

          
    </HStack> 
  );
};

export default SearchBar;