import React from 'react';
import { Box, VStack, Heading } from '@chakra-ui/react';
import SearchByZipcode from '../components/SearchByZipcode';
import { useLocation } from 'react-router-dom';

const ZipcodeSearch = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const zipcode = params.get('zipcode');

    return (
        <VStack spacing={0} align="stretch">
            <Box bg="gray.600" py={40} textAlign="center" height="40vh" display="flex" alignItems="center" justifyContent="center">
                <Heading as="h1" size="2xl" color="white">Find Restaurants</Heading>
            </Box>
            
            <Box>
                <SearchByZipcode zipcode={zipcode} />
            </Box>
        </VStack>
    );
};

export default ZipcodeSearch;