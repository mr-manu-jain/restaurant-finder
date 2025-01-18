import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  Select,
  Checkbox,
  NumberInput,
  NumberInputField,
  FormErrorMessage,
  CheckboxGroup
} from '@chakra-ui/react';

const RestaurantForm = ({ onSubmit, onCancel, initialData = null, isEditMode = false }) => {
  const [formData, setFormData] = useState({
    restaurantName: '',
    description: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    phoneNumber: '',
    averagePrice: '',
    openingTime: '',
    closingTime: '',
    reservation: false,
    franchise: false,
    cuisines: [],
    foodTypes: [],
    imageFile: null,
    imagePreview: null
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode && initialData) {
      setFormData({
        ...initialData,
        imagePreview: initialData.imageUrl || null
      });
    }
  }, [initialData, isEditMode]);

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'restaurantName',
      'address',
      'city',
      'state',
      'country',
      'zipCode',
      'phoneNumber',
      'averagePrice',
      'openingTime',
      'closingTime',
      'description',
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    // Create the FormData object
    const formDataToSend = new FormData();
    
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const ownerId = userData.id;

    // Create the restaurant data object without the image-related fields
    const restaurantData = {
      restaurantName: formData.restaurantName,
      description: formData.description,
      ownerId: ownerId,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      zipCode: formData.zipCode,
      phoneNumber: formData.phoneNumber,
      averagePrice: parseInt(formData.averagePrice),
      openingTime: formData.openingTime,
      closingTime: formData.closingTime,
      reservation: formData.reservation,
      franchise: formData.franchise,
      cuisines: formData.cuisines,
      foodTypes: formData.foodTypes
    };
  
    // Append the restaurant data as a JSON string with key 'restaurantData'
    formDataToSend.append('restaurantData', JSON.stringify(restaurantData));
    
    // Append the image file with key 'image' if it exists
    if (formData.imageFile) {
      formDataToSend.append('image', formData.imageFile);
    }
  
    try {
      await onSubmit(formDataToSend);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };
  
  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={4} >
        {/* Form fields with validation */}
        <FormControl isRequired isInvalid={errors.restaurantName}>
          <FormLabel>Restaurant Name</FormLabel>
          <Input
            value={formData.restaurantName}
            onChange={(e) => setFormData({...formData, restaurantName: e.target.value})}
          />
          <FormErrorMessage>{errors.restaurantName}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={errors.description}>
  <FormLabel>Description</FormLabel>
  <Input
    value={formData.description}
    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
  />
  <FormErrorMessage>{errors.description}</FormErrorMessage>
</FormControl>


        <FormControl isRequired isInvalid={errors.address}>
  <FormLabel>Address</FormLabel>
  <Input
    value={formData.address}
    onChange={(e) => setFormData({...formData, address: e.target.value})}
  />
  <FormErrorMessage>{errors.address}</FormErrorMessage>
</FormControl>

<HStack width="100%">
  <FormControl isRequired isInvalid={errors.city}>
    <FormLabel>City</FormLabel>
    <Input
      value={formData.city}
      onChange={(e) => setFormData({...formData, city: e.target.value})}
    />
    <FormErrorMessage>{errors.city}</FormErrorMessage>
  </FormControl>

  <FormControl isRequired isInvalid={errors.state}>
    <FormLabel>State</FormLabel>
    <Input
      value={formData.state}
      onChange={(e) => setFormData({...formData, state: e.target.value})}
    />
    <FormErrorMessage>{errors.state}</FormErrorMessage>
  </FormControl>
</HStack>

<HStack width="100%">
  <FormControl isRequired isInvalid={errors.country}>
    <FormLabel>Country</FormLabel>
    <Input
      value={formData.country}
      onChange={(e) => setFormData({...formData, country: e.target.value})}
    />
    <FormErrorMessage>{errors.country}</FormErrorMessage>
  </FormControl>

  <FormControl isRequired isInvalid={errors.zipCode}>
    <FormLabel>ZIP Code</FormLabel>
    <Input
      value={formData.zipCode}
      onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
    />
    <FormErrorMessage>{errors.zipCode}</FormErrorMessage>
  </FormControl>
</HStack>

<FormControl isRequired isInvalid={errors.phoneNumber}>
  <FormLabel>Phone Number</FormLabel>
  <Input
    value={formData.phoneNumber}
    onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
  />
  <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
</FormControl>

<FormControl isRequired isInvalid={errors.averagePrice}>
  <FormLabel>Average Price</FormLabel>
  <NumberInput min={0}>
    <NumberInputField
      value={formData.averagePrice}
      onChange={(e) => setFormData({...formData, averagePrice: parseInt(e.target.value)})}
    />
  </NumberInput>
  <FormErrorMessage>{errors.averagePrice}</FormErrorMessage>
</FormControl>

<HStack width="100%">
  <FormControl isRequired isInvalid={errors.openingTime}>
    <FormLabel>Opening Time</FormLabel>
    <Input
      type="time"
      value={formData.openingTime}
      onChange={(e) => setFormData({...formData, openingTime: e.target.value})}
    />
    <FormErrorMessage>{errors.openingTime}</FormErrorMessage>
  </FormControl>

  <FormControl isRequired isInvalid={errors.closingTime}>
    <FormLabel>Closing Time</FormLabel>
    <Input
      type="time"
      value={formData.closingTime}
      onChange={(e) => setFormData({...formData, closingTime: e.target.value})}
    />
    <FormErrorMessage>{errors.closingTime}</FormErrorMessage>
  </FormControl>
</HStack>

<FormControl>
  <FormLabel>Cuisines</FormLabel>
  <CheckboxGroup
    value={formData.cuisines}
    onChange={(selectedValues) => setFormData({ ...formData, cuisines: selectedValues })}
  >
    <VStack align="start">
      <Checkbox value="Non-Vegetarian">Non-Vegetarian</Checkbox>
      <Checkbox value="Vegan">Vegan</Checkbox>
      <Checkbox value="Vegetarian">Vegetarian</Checkbox>
      <Checkbox value="Pescatarian">Pescatarian</Checkbox>
      <Checkbox value="Gluten-Free">Gluten-Free</Checkbox>
      <Checkbox value="Keto">Keto</Checkbox>
      <Checkbox value="Halal">Halal</Checkbox>
      <Checkbox value="Kosher">Kosher</Checkbox>
    </VStack>
  </CheckboxGroup>
</FormControl>

<FormControl>
  <FormLabel>Food Types</FormLabel>
  <CheckboxGroup
    value={formData.foodTypes}
    onChange={(selectedValues) => setFormData({ ...formData, foodTypes: selectedValues })}
  >
    <VStack align="start">
      <Checkbox value="Indian">Indian</Checkbox>
      <Checkbox value="Chinese">Chinese</Checkbox>
      <Checkbox value="Italian">Italian</Checkbox>
      <Checkbox value="Japanese">Japanese</Checkbox>
      <Checkbox value="Mexican">Mexican</Checkbox>
      <Checkbox value="Thai">Thai</Checkbox>
      <Checkbox value="French">French</Checkbox>
    </VStack>
  </CheckboxGroup>
</FormControl>
       
        <FormControl>
          <FormLabel>Image</FormLabel>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  setFormData({
                    ...formData,
                    imageFile: file,
                    imagePreview: event.target.result
                  });
                };
                reader.readAsDataURL(file);
              }
            }}
          />
          {formData.imagePreview && (
            <Box mt={2}>
              <img 
                src={formData.imagePreview} 
                alt="Preview" 
                style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }} 
              />
            </Box>
          )}
        </FormControl>

        <HStack width="100%" spacing={4}>
          <Button 
            type="submit" 
            colorScheme="blue" 
            width="full"
          >
            {isEditMode ? 'Update Restaurant' : 'Create Restaurant'}
          </Button>
          {onCancel && (
            <Button onClick={onCancel} width="full">
              Cancel
            </Button>


          )}
        </HStack>
      </VStack>
    </Box>
  );
};

export default RestaurantForm;