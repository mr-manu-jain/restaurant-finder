// src/components/RestaurantResults.jsx
import React from 'react';
import { List, ListItem, Box, HStack, VStack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

// Mock data for demonstration
const mockResults = [
  { id: 1, name: 'Kitchen House', cuisine: 'Italian Cuisine', distance: '0.2 miles away' },
  { id: 2, name: 'Restaurant B', cuisine: 'Burgers & Fries', distance: '0.4 miles away' },
  { id: 3, name: 'Restaurant C', cuisine: 'Sushi Bar', distance: '0.6 miles away' },
];

const RestaurantResults = () => {
  const navigate = useNavigate();

  const handleRestaurantClick = (id) => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <List spacing={4}>
      {mockResults.map((result) => (
        <ListItem 
          key={result.id} 
          p={4} 
          shadow="md" 
          borderWidth="1px" 
          borderRadius="md"
          cursor="pointer"
          transition="all 0.2s"
          _hover={{
            shadow: 'lg',
            transform: 'translateY(-2px)',
            borderColor: 'gray.300',
            bg: 'gray.50'
          }}
          onClick={() => handleRestaurantClick(result.id)}
        >
          <HStack justifyContent="space-between">
            <HStack alignItems='center'>
              <Box 
                boxSize='50px' 
                bg='gray.200' 
                borderRadius='full' 
                mr={4}
              />
              <VStack alignItems='start' spacing={1}>
                <Text fontWeight='bold' fontSize="lg">{result.name}</Text>
                <Text color="gray.600">{result.cuisine}</Text>
              </VStack>
            </HStack>
            <Text color="gray.500">{result.distance}</Text>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};

export default RestaurantResults;