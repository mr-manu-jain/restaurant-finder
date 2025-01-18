import React from 'react';
import { SimpleGrid, Stat, StatLabel, StatNumber, Center, Box } from '@chakra-ui/react';

export default function AdminStats({ totalUsers, totalRestaurants }) {
  return (
    <Box display="flex" justifyContent="center" mt={8} mb={8}>
      <SimpleGrid columns={2} spacing={10} maxWidth="600px">
        <Stat bg="white" p={4} borderRadius="lg" boxShadow="sm">
          <Center flexDirection="column" h="100%">
            <StatLabel>Total Users</StatLabel>
            <StatNumber>{totalUsers}</StatNumber>
          </Center>
        </Stat>
        <Stat bg="white" p={4} borderRadius="lg" boxShadow="sm">
          <Center flexDirection="column" h="100%">
            <StatLabel>Total Restaurants</StatLabel>
            <StatNumber>{totalRestaurants}</StatNumber>
          </Center>
        </Stat>
      </SimpleGrid>
    </Box>
  );
}