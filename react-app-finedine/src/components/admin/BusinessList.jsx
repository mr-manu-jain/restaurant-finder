import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, IconButton, Box, Badge, Menu, MenuButton, MenuList, MenuItem, Image, HStack, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, VStack, Spinner, Center } from '@chakra-ui/react';
import { SettingsIcon, StarIcon } from '@chakra-ui/icons';
import axios from 'axios';
import EditRestaurantForm from './EditRestaurantForm';

export default function BusinessList({ searchTerm }) {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isOwnerOpen, onOpen: onOwnerOpen, onClose: onOwnerClose } = useDisclosure();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredRestaurants(restaurants); // Reset to show all restaurants when searchTerm is empty
    } else {
      const filtered = restaurants.filter((restaurant) =>
        restaurant.restaurantName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    }
  }, [searchTerm, restaurants]);
  
  // Function to check for duplicates
const markDuplicates = (restaurants) => {
  const duplicatesMap = new Map();

  // Create a map to track occurrences of each name-address combination
  restaurants.forEach((restaurant) => {
    const key = `${restaurant.restaurantName.toLowerCase()}|${restaurant.address.toLowerCase()}`;
    if (duplicatesMap.has(key)) {
      duplicatesMap.set(key, [...duplicatesMap.get(key), restaurant.id]); // Add restaurant ID to the list of duplicates
    } else {
      duplicatesMap.set(key, [restaurant.id]); // Initialize with the current restaurant ID
    }
  });
  // Mark restaurants as duplicate if their key appears more than once
  return restaurants.map((restaurant) => {
    const key = `${restaurant.restaurantName.toLowerCase()}|${restaurant.address.toLowerCase()}`;
    const isDuplicate = duplicatesMap.get(key).length > 1; // Check if more than one entry exists for this key
    return { ...restaurant, isDuplicate };
  });
};


  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://springboot-app-finedine-dev.us-east-1.elasticbeanstalk.com/api/restaurant/getAllRestaurants', { ownerId: "0" });
      const restaurantsWithOwners = await Promise.all(response.data.restaurants.map(async (restaurant) => {
        try {
          const ownerResponse = await axios.post('http://springboot-app-finedine-dev.us-east-1.elasticbeanstalk.com/api/users/getUserDetails', { id: restaurant.ownerId });
          return { ...restaurant, owner: ownerResponse.data };
        } catch (error) {
          console.error(`Error fetching owner details for restaurant ${restaurant.id}:`, error);
          return { ...restaurant, owner: { name: 'N/A', phone: 'N/A' } };
        }
      }));
      // Mark duplicates using the updated logic
      const restaurantsWithDuplicates = markDuplicates(restaurantsWithOwners);
      setRestaurants(restaurantsWithDuplicates);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    onEditOpen();
  };

  const handleViewOwner = async (ownerId) => {
    try {
      // Add proper request body structure
      const response = await axios.post('http://springboot-app-finedine-dev.us-east-1.elasticbeanstalk.com/api/users/getUserDetails', {
        id: ownerId.toString() // Ensure ownerId is sent as string
      });
      
      if (response.data) {
        setSelectedOwner(response.data);
        onOwnerOpen();
      }
    } catch (error) {
      console.error('Error fetching owner details:', error);
      // Handle error gracefully
      setSelectedOwner({
        name: 'N/A',
        email: '',
        phone: 'N/A',
        address: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
        role: '',
        id: ''
      });
      onOwnerOpen();
    }
  };

  const handleSuspendBusiness = async (restaurantId) => {
    if (window.confirm('Are you sure you want to suspend this business?')) {
      try {
        await axios.post('http://springboot-app-finedine-dev.us-east-1.elasticbeanstalk.com/api/restaurant/deleteRestaurant', { restaurantId });
        fetchRestaurants();
      } catch (error) {
        console.error('Error suspending business:', error);
      }
    }
  };

  if (loading) {
    return (
      <Center h="200px">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box overflowX="auto" bg="white" borderRadius="lg" boxShadow="sm" p={4}>
      <Table variant="simple">
        <Thead bg="gray.50">
          <Tr>
            <Th>RESTAURANT</Th>
            <Th>OWNER</Th>
            <Th>EMAIL</Th>
            <Th>ADDRESS</Th>
            {/* <Th>RATING</Th> */}
            {/* <Th>STATUS</Th> */}
            <Th>IS DUPLICATE</Th>
            <Th>ACTIONS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredRestaurants.map((restaurant) => (
            <Tr key={restaurant.id}>
              <Td>
                <HStack>
                  {/* <Image src={restaurant.image} alt={restaurant.restaurantName} boxSize="40px" objectFit="cover" borderRadius="md" /> */}
                  <Box>
                    <Text fontWeight="bold">{restaurant.restaurantName}</Text>
                    <Text fontSize="sm" color="gray.600">{restaurant.cuisines ? restaurant.cuisines.join(', ') : 'N/A'}</Text>
                  </Box>
                </HStack>
              </Td>
              <Td>{restaurant.owner?.name || 'N/A'}</Td>
              <Td>
                <Text fontSize="sm">{restaurant.owner?.email || 'N/A'}</Text>
              </Td>
              <Td>
                <Text fontSize="sm">{`${restaurant.address}, ${restaurant.city}`}</Text>
              </Td>
              {/* <Td>
                <HStack>
                  <StarIcon color="yellow.400" />
                  <Text>N/A</Text>
                </HStack>
              </Td> */}
              {/* <Td>
                <Badge colorScheme="green">Active</Badge>
              </Td> */}
              <Td>{restaurant.isDuplicate ? "Yes" : "No"}</Td>
              <Td>
                <Menu>
                  <MenuButton as={IconButton} icon={<SettingsIcon />} variant="ghost" />
                  <MenuList>
                    {/* <MenuItem onClick={() => handleEditRestaurant(restaurant)}>Edit Information</MenuItem> */}
                    <MenuItem onClick={() => handleViewOwner(restaurant.ownerId)}>View Owner Information</MenuItem>
                    <MenuItem color="red.500" onClick={() => handleSuspendBusiness(restaurant.id)}>Delete Business</MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isEditOpen} onClose={onEditClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Restaurant</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedRestaurant && <EditRestaurantForm restaurant={selectedRestaurant} onClose={onEditClose} refreshRestaurants={fetchRestaurants} />}
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOwnerOpen} onClose={onOwnerClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Owner Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedOwner && (
              <VStack align="start" spacing={3}>
                <Text><strong>Name:</strong> {selectedOwner.name}</Text>
                <Text><strong>Email:</strong> {selectedOwner.email}</Text>
                <Text><strong>Phone:</strong> {selectedOwner.phone}</Text>
                <Text><strong>Address:</strong> {selectedOwner.address}</Text>
                <Text><strong>City:</strong> {selectedOwner.city}</Text>
                <Text><strong>State:</strong> {selectedOwner.state}</Text>
                <Text><strong>Country:</strong> {selectedOwner.country}</Text>
                <Text><strong>Zip Code:</strong> {selectedOwner.zipCode}</Text>
                {/* <Text><strong>Role:</strong> {selectedOwner.role}</Text>
                <Text><strong>User ID:</strong> {selectedOwner.id}</Text> */}
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}