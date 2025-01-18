import React, { useState } from 'react';
import { VStack, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import axios from 'axios';

export default function EditUserForm({ user, onClose, refreshUsers }) {
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://springboot-app-finedine-dev.us-east-1.elasticbeanstalk.com/api/users/updateUser', formData);
      refreshUsers();
      onClose();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input name="name" value={formData.name} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input name="email" value={formData.email} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Phone</FormLabel>
          <Input name="phone" value={formData.phone} onChange={handleChange} />
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
        <Button type="submit" colorScheme="blue">Save Changes</Button>
      </VStack>
    </form>
  );
}