import React, { useState, useEffect } from 'react';
import { Box, Container, VStack, Heading, HStack, Button, Center } from '@chakra-ui/react';
import SearchBar from '../../components/SearchBar';
import AdminStats from '../../components/admin/AdminStats';
import UsersList from '../../components/admin/UsersList';
import BusinessOwnersList from '../../components/admin/BusinessOwnersList';
import BusinessList from '../../components/admin/BusinessList';
import searchStageImage from '../../assets/searchStageImage.jpg';
import axios from 'axios';

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState('users');
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  const [filteredData, setFilteredData] = useState([]); // Store filtered data
  const [allUsers, setAllUsers] = useState([]); // Store all users
  const [allRestaurants, setAllRestaurants] = useState([]); // Store all restaurants
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
    console.log(searchTerm);
  };

  const handleReset = () => {
    setSearchTerm(''); // Clear the search term
  };
  

  useEffect(() => {
    fetchTotalUsers();
    fetchTotalRestaurants();
  }, []);

  const fetchTotalUsers = async () => {
    try {
      const response = await axios.post('http://springboot-app-finedine-dev.us-east-1.elasticbeanstalk.com/api/users/getAllUsers');
      
      setTotalUsers(response.data.total);
      setAllUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching total users:', error);
    }
  };

  const fetchTotalRestaurants = async () => {
    try {
      const response = await axios.post('http://springboot-app-finedine-dev.us-east-1.elasticbeanstalk.com/api/restaurant/getAllRestaurants', { ownerId: "0" });
      setAllRestaurants(response.data.restaurants); 
      setTotalRestaurants(response.data.total);
    } catch (error) {
      console.error('Error fetching total restaurants:', error);
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case 'users':
        return <UsersList searchTerm={searchTerm} onReset={handleReset} />;
      case 'restaurants':
        return <BusinessList searchTerm={searchTerm} onReset={handleReset} />;
      default:
        return null;
    }
  };
  

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Container maxW="container.xl" flex="1">
        <Box bgImage={`url(${searchStageImage})`} bgSize="cover" bgPosition="center" py={12} px={6} borderRadius="lg" position="relative" overflow="hidden">
          <Box position="absolute" top="0" left="0" right="0" bottom="0" bg="blackAlpha.500" />
          <VStack position="relative" spacing={6}>
            <Heading as="h2" size="xl" color="white">Admin Control Panel</Heading>
            <SearchBar onSearch={handleSearch} onReset={handleReset}/>
            <HStack spacing={4}>
              <Button variant="solid" bg={activeView === 'users' ? 'blue.500' : 'white'} color={activeView === 'users' ? 'white' : 'black'} onClick={() => setActiveView('users')}>Users</Button>
              {/* <Button variant="solid" bg={activeView === 'businesses' ? 'blue.500' : 'white'} color={activeView === 'businesses' ? 'white' : 'black'} onClick={() => setActiveView('businesses')}>Businesses</Button> */}
              <Button variant="solid" bg={activeView === 'restaurants' ? 'blue.500' : 'white'} color={activeView === 'restaurants' ? 'white' : 'black'} onClick={() => setActiveView('restaurants')}>Restaurants</Button>
              {/* <Button variant="solid" bg="white">Settings</Button> */}
            </HStack>
          </VStack>
        </Box>
        <AdminStats totalUsers={totalUsers} totalRestaurants={totalRestaurants} />
        {renderContent()}
      </Container>
    </Box>
  );
}