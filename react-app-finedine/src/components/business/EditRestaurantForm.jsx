import React from 'react';
import { Box } from '@chakra-ui/react';
import RestaurantForm from './RestaurantForm';

const EditRestaurantForm = ({ initialData, onSubmit, onCancel }) => {
  const handleSubmit = async (formData) => {
    // Include the id in the formData
    const updatedFormData = new FormData();
    updatedFormData.append('restaurantData', JSON.stringify({
      ...JSON.parse(formData.get('restaurantData')),
      id: initialData.id
    }));
    
    // Append the image if it exists
    const imageFile = formData.get('image');
    if (imageFile) {
      updatedFormData.append('image', imageFile);
    }

    await onSubmit(updatedFormData);
  };

  return (
    <Box maxWidth="800px" margin="0 auto" p={4}>
      <RestaurantForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={onCancel}
        isEditMode={true}
      />
    </Box>
  );
};

export default EditRestaurantForm;
