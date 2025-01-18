import React from 'react';
import { Flex, HStack, Button, Text } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const RestaurantPagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const prevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Flex justify="center" mt={4}>
      <HStack>
        <Button 
          onClick={prevPage} 
          isDisabled={currentPage === 1}
          leftIcon={<ChevronLeftIcon />}
        >
          Previous
        </Button>
        <Text>Page {currentPage} of {totalPages}</Text>
        <Button 
          onClick={nextPage} 
          isDisabled={currentPage === totalPages}
          rightIcon={<ChevronRightIcon />}
        >
          Next
        </Button>
      </HStack>
    </Flex>
  );
};

export default RestaurantPagination;
