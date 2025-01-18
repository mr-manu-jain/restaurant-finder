import React, { useState } from 'react';
import { VStack, FormControl, FormLabel, Input, Button, Checkbox, HStack, Select } from '@chakra-ui/react';
import axios from 'axios';

export default function EditRestaurantForm({ restaurant, onClose, refreshRestaurants }) {
  const [formData, setFormData] = useState(restaurant);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleArrayChange = (e, field) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [field]: value ? value.split(',').map(item => item.trim()) : []
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://springboot-app-finedine-dev.us-east-1.elasticbeanstalk.com/api/restaurant/updateRestaurant', formData);
      refreshRestaurants();
      onClose();
    } catch (error) {
      console.error('Error updating restaurant:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Restaurant Name</FormLabel>
          <Input name="restaurantName" value={formData.restaurantName} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Address</FormLabel>
          <Input name="address" value={formData.address} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>City</FormLabel>
          <Input name="city" value={formData.city} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>State</FormLabel>
          <Input name="state" value={formData.state} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Country</FormLabel>
          <Input name="country" value={formData.country} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Zip Code</FormLabel>
          <Input name="zipCode" value={formData.zipCode} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Phone Number</FormLabel>
          <Input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Opening Time</FormLabel>
          <Input name="openingTime" type="time" value={formData.openingTime} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Closing Time</FormLabel>
          <Input name="closingTime" type="time" value={formData.closingTime} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Average Price</FormLabel>
          <Input name="averagePrice" type="number" value={formData.averagePrice} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Cuisines (comma-separated)</FormLabel>
          <Input name="cuisines" value={formData.cuisines ? formData.cuisines.join(', ') : ''} onChange={(e) => handleArrayChange(e, 'cuisines')} />
        </FormControl>
        <FormControl>
          <FormLabel>Food Types (comma-separated)</FormLabel>
          <Input name="foodTypes" value={formData.foodTypes ? formData.foodTypes.join(', ') : ''} onChange={(e) => handleArrayChange(e, 'foodTypes')} />
        </FormControl>
        <HStack>
          <Checkbox name="reservation" isChecked={formData.reservation} onChange={handleChange}>
            Reservation Available
          </Checkbox>
          <Checkbox name="franchise" isChecked={formData.franchise} onChange={handleChange}>
            Franchise
          </Checkbox>
        </HStack>
        <Button type="submit" colorScheme="blue">Save Changes</Button>
      </VStack>
    </form>
  );
}