import React from 'react';
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, VStack, Heading, Text } from '@chakra-ui/react';
import AddRestaurant from '../../components/business/AddRestaurant';
import RestaurantList from '../../components/business/RestaurantList';
import { useNavigate } from 'react-router-dom';
import { Image } from '@chakra-ui/react';
import manageRestaurantImage from '../../assets/manageRestaurant.jpg'; // Update to your actual image path

const ManageRestaurants = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box 
        bgImage={`url(${manageRestaurantImage})`}
        bgSize="cover"
        bgPosition="center"
        height="50vh"
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
        <VStack spacing={6} position="relative" zIndex={1}>
          <Heading as="h2" size="2xl" color="white">
            Manage Your Restaurants
          </Heading>
          <Text color="white" fontSize="lg">Add, edit, or view your restaurant listings</Text>
        </VStack>
      </Box>

      <Box p={4}>
        <Tabs>
          <TabList>
            <Tab>My Restaurants</Tab>
            <Tab>Add New</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <RestaurantList />
            </TabPanel>
            <TabPanel>
              <AddRestaurant />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default ManageRestaurants;