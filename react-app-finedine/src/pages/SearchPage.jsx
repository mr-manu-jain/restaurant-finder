import React, { useState } from 'react';
import { Box, Container, VStack, Heading, Button, HStack, Text, Image } from '@chakra-ui/react';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import NumericFilterDialog from '../components/NumericFilterDialog';
import MultipleChoiceFilterDialog from '../components/MultipleChoiceFilterDialog';
import searchStageImage from '../assets/searchStageImage.jpg';

const SearchPage = () => {
  const [filterType, setFilterType] = useState(null);
  const [filterValue, setFilterValue] = useState({});
  const [isNumericDialogOpen, setIsNumericDialogOpen] = useState(false);
  const [isMultipleChoiceDialogOpen, setIsMultipleChoiceDialogOpen] = useState(false);
  const [filtersSubmitted, setFiltersSubmitted] = useState(false);

  const cuisineOptions = ['Vegan', 'Non-Vegetarian', 'Vegetarian', 'Pescatarian', 'Gluten-Free', 'Keto', 'Halal', 'Kosher'];
  const foodTypeOptions = ['Indian', 'Italian', 'Chinese', 'Japanese', 'Mexican', 'Thai', 'French'];

  const handleSearch = (query) => {
    setFilterType('Name');
    setFilterValue({ name: query });
    setFiltersSubmitted(true);
  };

  const handleFilterClick = (type) => {
    setFilterType(type);
    if (type === 'Cuisine' || type === 'FoodType') {
      setIsMultipleChoiceDialogOpen(true);
    } else {
      setIsNumericDialogOpen(true);
    }
  };

  const handleNumericSubmit = (value) => {
    setFilterValue(value);
    setIsNumericDialogOpen(false);
    setFiltersSubmitted(true);
  };

  const handleMultipleChoiceSubmit = (selectedOptions) => {
    setFilterValue({ [filterType.toLowerCase()]: selectedOptions });
    setIsMultipleChoiceDialogOpen(false);
    setFiltersSubmitted(true);
  };

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Box 
        bgImage={`url(${searchStageImage})`}
        bgSize="cover"
        bgPosition="center"
        height="50vh"
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        mb={12}
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="blackAlpha.600"
        />
        <Container maxW="container.xl" position="relative" zIndex={1}>
          <VStack spacing={6}>
            <Heading as="h2" size="2xl" color="white">
              Discover Restaurants
            </Heading>
            <SearchBar onSearch={handleSearch} />
            <HStack spacing={4} flexWrap="wrap" justifyContent="center">
              <Button variant="solid" bg="white" onClick={() => handleFilterClick('Ratings')}>Ratings</Button>
              <Button variant="solid" bg="white" onClick={() => handleFilterClick('Cuisine')}>Cuisine</Button>
              <Button variant="solid" bg="white" onClick={() => handleFilterClick('Price')}>Price</Button>
              <Button variant="solid" bg="white" onClick={() => handleFilterClick('FoodType')}>Food Type</Button>
            </HStack>
          </VStack>
        </Container>
      </Box>

      <Container maxW="container.xl" flex="1">
        {filtersSubmitted ? (
          <Box mt={12}>
            <Heading as="h3" size="lg" mb={6} textAlign="center">
              Restaurant Results
            </Heading>
            <SearchResults filterType={filterType} filterValue={filterValue} />
          </Box>
        ) : (
          <Box mt={12} textAlign="center">
            <VStack spacing={6}>
              <Heading as="h3" size="lg" color="gray.600">
                Ready to find your next favorite restaurant?
              </Heading>
              <Text fontSize="xl" color="gray.500">
                Use the search bar or filters above to discover amazing dining options near you.
              </Text>
            </VStack>
          </Box>
        )}

        {isNumericDialogOpen && (
          <NumericFilterDialog 
            type={filterType} 
            isOpen={isNumericDialogOpen}
            onClose={() => setIsNumericDialogOpen(false)} 
            onSubmit={handleNumericSubmit} 
          />
        )}

        {isMultipleChoiceDialogOpen && (
          <MultipleChoiceFilterDialog 
            options={filterType === 'Cuisine' ? cuisineOptions : foodTypeOptions}
            label={filterType}
            isOpen={isMultipleChoiceDialogOpen}
            onClose={() => setIsMultipleChoiceDialogOpen(false)} 
            onSubmit={handleMultipleChoiceSubmit} 
          />
        )}
      </Container>
    </Box>
  );
};

export default SearchPage;