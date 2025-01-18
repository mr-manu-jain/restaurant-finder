import React, { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Box,
  useToast,
  useDisclosure,
  Spinner,
  Center
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { restaurantService } from '../../services/restaurantService';
import ReusableModal from './ReusableModal';
import RestaurantForm from './RestaurantForm';
import ConfirmationModal from './ConfirmationModal';

import EditRestaurantForm from './EditRestaurantForm';


const RestaurantList = () => {
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { 
    isOpen: isDeleteModalOpen, 
    onOpen: openDeleteModal, 
    onClose: closeDeleteModal 
  } = useDisclosure();
  const toast = useToast();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleEditClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setEditModalOpen(true);
  };
  
  const [editConfirmationOpen, setEditConfirmationOpen] = useState(false);
  const [editedRestaurant, setEditedRestaurant] = useState(null);
  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const userData = JSON.parse(sessionStorage.getItem('userData'));
      const ownerId = userData.id;
      const response = await restaurantService.getAllRestaurants(ownerId);
      console.log('ownerID:');
      console.log(ownerId);
      if (response && response.restaurants) {
        setRestaurants(response.restaurants);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast({
        title: 'Error fetching restaurants',
        description: 'Unable to load restaurants. Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    } finally {
      setLoading(false);
    }
  };
 
  const handleEditSubmit = async (formData) => {
    try {
      await restaurantService.updateRestaurant(formData);
      toast({
        title: 'Restaurant updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true
      });
      setEditModalOpen(false);
      fetchRestaurants();
    } catch (error) {
      console.error('Update error:', error);
      toast({
        title: 'Error updating restaurant',
        description: error.message || 'Unable to update restaurant. Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  };
  
  const handleEditConfirm = async () => {
    try {
      await restaurantService.updateRestaurant(editedRestaurant);
      toast({
        title: 'Restaurant updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true
      });
      setEditModalOpen(false);
      setEditConfirmationOpen(false);
      fetchRestaurants();
    } catch (error) {
      console.error('Update error:', error);
      toast({
        title: 'Error updating restaurant',
        description: error.message || 'Unable to update restaurant. Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  };

  const handleDeleteClick = (restaurant) => {
    setDeleteTarget(restaurant);
    openDeleteModal();
  };
  
  const handleDeleteConfirm = async () => {
    if (!deleteTarget?.id) return;
    
    try {
      const response = await restaurantService.deleteRestaurant(deleteTarget.id);
      // Check if the response indicates success (you may need to adjust this condition based on your API's response structure)
      if (response && (response.isDeleted === true || response.status === 200)) {
        toast({
          title: 'Restaurant deleted successfully',
          status: 'success',
          duration: 3000,
          isClosable: true
        });
        // Refresh the restaurant list
        await fetchRestaurants();
      } else {
        throw new Error('Failed to delete restaurant');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: 'Error deleting restaurant',
        description: error.message || 'Unable to delete restaurant. Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    } finally {
      setDeleteTarget(null);
      closeDeleteModal();
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  if (loading) {
    return (
      <Center h="200px">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box overflowX="auto">
      <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Address</Th>
          <Th>Phone Number</Th>
          <Th>Opening Hours</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {restaurants.map((restaurant) => {
          const {
            id,
            ownerId,
            createdAt,
            updatedAt,
            ...displayData
          } = restaurant;

          return (
            <Tr key={id}>
              <Td>{displayData.restaurantName}</Td>
              <Td>
                {`${displayData.address}, ${displayData.city}, ${displayData.state} ${displayData.zipCode}`}
              </Td>
              <Td>{displayData.phoneNumber}</Td>
              <Td>{`${displayData.openingTime} - ${displayData.closingTime}`}</Td>
              <Td>
                {/* <IconButton
                  aria-label="Edit restaurant"
                  icon={<EditIcon />}
                  mr={2}
                  onClick={() => {
                    setSelectedRestaurant({...displayData, id});
                    onOpen();
                  }}
                /> */}

<IconButton
        aria-label="Edit restaurant"
        icon={<EditIcon />}
        mr={2}
        onClick={() => handleEditClick(restaurant)}
      />
                <IconButton
                  aria-label="Delete restaurant"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => handleDeleteClick({...displayData, id})}
                />
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>

      {selectedRestaurant && (
        <ReusableModal
          isOpen={isOpen}
          onClose={() => {
            setSelectedRestaurant(null);
            onClose();
          }}
          title="Edit Restaurant"
        >
          <RestaurantForm
            initialData={selectedRestaurant}
            onSubmit={async (formData) => {
              try {
                // If it's an update operation
                if (selectedRestaurant?.id) {
                  await restaurantService.updateRestaurant(formData);
                } else {
                  // If it's a create operation
                  await restaurantService.createRestaurant(formData);
                }
                toast({
                  title: `Restaurant ${selectedRestaurant?.id ? 'updated' : 'added'} successfully`,
                  status: 'success',
                  duration: 3000
                });
                onClose();
                fetchRestaurants();
              } catch (error) {
                console.error('Error:', error);
                toast({
                  title: `Error ${selectedRestaurant?.id ? 'updating' : 'adding'} restaurant`,
                  description: error.message,
                  status: 'error',
                  duration: 3000
                });
              }
            }}
          />
         </ReusableModal>
      )}

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
        title="Delete Restaurant"
        message={`Are you sure you want to delete ${deleteTarget?.restaurantName}? This action cannot be undone.`}
      />


<ReusableModal 
isOpen={editModalOpen} 
onClose={() => setEditModalOpen(false)} 
title="Edit Restaurant"
>
<EditRestaurantForm 
  initialData={selectedRestaurant} 
  onSubmit={handleEditSubmit}
  onCancel={() => setEditModalOpen(false)}
/>
</ReusableModal>

      <ConfirmationModal
        isOpen={editConfirmationOpen}
        onClose={() => setEditConfirmationOpen(false)}
        onConfirm={handleEditConfirm}
        title="Confirm Edit"
        message="Are you sure you want to save these changes?"
      />
    </Box>

    
  );
};

export default RestaurantList;