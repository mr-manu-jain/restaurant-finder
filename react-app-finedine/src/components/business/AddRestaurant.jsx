import React from 'react';
import { Box, useToast } from '@chakra-ui/react';
import RestaurantForm from './RestaurantForm';
import { restaurantService } from '../../services/restaurantService';

export default function AddRestaurant() {
  const toast = useToast();

  const handleSubmit = async (formData) => {
    try {
      await restaurantService.createRestaurant(formData);
      toast({
        title: 'Restaurant added successfully',
        status: 'success',
        duration: 3000,
        isClosable: true
      });
      // Optional: Add navigation back to restaurant list
      // navigate('/restaurants');
    } catch (error) {
      toast({
        title: 'Error adding restaurant',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  };

  return (
    <Box maxWidth="800px" margin="0 auto" p={4}>
      <RestaurantForm 
        onSubmit={handleSubmit}
        isEditMode={false}
      />
    </Box>
  );
}