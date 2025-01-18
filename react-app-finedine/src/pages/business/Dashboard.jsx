// pages/business/Dashboard.jsx
import React from 'react';
import { 
  Box, 
  Button, 
  Container, 
  VStack, 
  Heading, 
  HStack,
  Flex 
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';
import RestaurantResults from '../../components/RestaurantResults';
import RestaurantList from '../../components/business/RestaurantList';
import searchStageImage from '../../assets/searchStageImage.jpg';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Container maxW="container.xl" flex="1">
        {/* Stage Section */}
        <Box 
          bgImage={`url(${searchStageImage})`}
          bgSize="cover"
          bgPosition="center"
          py={12} 
          px={6} 
          textAlign="center" 
          borderRadius="lg" 
          position="relative" 
          overflow="hidden"
        >
          <Box 
            position="absolute" 
            top="0" 
            left="0" 
            right="0" 
            bottom="0" 
            bg="blackAlpha.500" 
          />
          <VStack position="relative" spacing={6}>
            <Heading as="h2" size="xl" color="white">
              Manage Your Restaurants
            </Heading>
            <SearchBar />
            <HStack spacing={4}>
              <Button variant="solid" bg="white">Ratings</Button>
              <Button variant="solid" bg="white">Cuisine</Button>
              <Button variant="solid" bg="white">Price</Button>
              <Button variant="solid" bg="white">Status</Button>
            </HStack>
          </VStack>
        </Box>

        {/* Content Section */}
        <Box mt={12} display="flex" flexDirection="column" alignItems="center">
          <Button
            bg="#2B6CB0"
            color="white"
            width="200px"
            height="45px"
            fontSize="md"
            fontWeight="semibold"
            borderRadius="8px"
            _hover={{
                bg: "#2D3748",
                transform: "translateY(-1px)"
            }}
            onClick={() => navigate('/business/restaurants')}
            boxShadow="0 2px 4px rgba(0,0,0,0.1)"
            transition="all 0.2s ease"
            mb={8}
          >
            Manage Restaurants
          </Button>

          <Flex w="100%" gap={8} mt={8}>
            <Box w="25%">
              <Heading as="h3" size="lg">
                Your Restaurants
              </Heading>
            </Box>
            <Box w="75%">
              <RestaurantResults />
              {/* <RestaurantList /> */}
            </Box>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
}