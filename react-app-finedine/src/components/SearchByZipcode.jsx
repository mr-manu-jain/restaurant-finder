import React, { useState, useEffect } from 'react';
import { List, ListItem, Box, HStack, VStack, Heading, Text, Spinner, Icon, Button, Flex } from '@chakra-ui/react';
import axios from 'axios';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const SearchByZipcode = ({ zipcode }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items to display per page

    useEffect(() => {
        const fetchCombinedResults = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch data from the first API
                const api1Response = await axios.post('http://springboot-app-finedine-dev.us-east-1.elasticbeanstalk.com/api/findByZipcode', { zipcode });
                const api1Results = api1Response.data.map((item) => ({
                    name: item.name,
                    address: item.address,
                    rating: item.rating,
                }));

                // Fetch data from the second API
                const api2Response = await axios.post('http://springboot-app-finedine-dev.us-east-1.elasticbeanstalk.com/api/restaurant/getByZipCode', { zipCode: zipcode });
                const restaurants = api2Response.data.restaurants;

                // Fetch ratings for each restaurant in the second API's response
                const api2ResultsWithRatings = await Promise.all(
                    restaurants.map(async (restaurant) => {
                        try {
                            const ratingResponse = await axios.post('http://springboot-app-finedine-dev.us-east-1.elasticbeanstalk.com/api/restaurant/getRatingsForRestaurant', {
                                restaurantId: restaurant.id,
                            });
                            return {
                                name: restaurant.restaurantName,
                                address: restaurant.address,
                                rating: ratingResponse.data.averageRating || 'N/A', // Default to 'N/A' if no rating
                            };
                        } catch (ratingError) {
                            console.error(`Error fetching ratings for restaurant ${restaurant.id}:`, ratingError);
                            return {
                                name: restaurant.restaurantName,
                                address: restaurant.address,
                                rating: 'N/A',
                            };
                        }
                    })
                );

                // Combine results from both APIs
                const combinedResults = [...api1Results, ...api2ResultsWithRatings];
                setResults(combinedResults);
            } catch (err) {
                setError('An error occurred while fetching data.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (zipcode) {
            fetchCombinedResults();
        }
    }, [zipcode]);


    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(results.length / itemsPerPage);

    const nextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const prevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    if (!zipcode) return null;

    return (
        <Box p={4}>
            <Heading as="h2" size="l" mb={4}>Search Results for Zipcode: {zipcode}</Heading>
            {loading && <Spinner />}
            {error && <Text color="red.500">{error}</Text>}
            {results && (
                <Box>
                    {/* Display your results here. This is just an example: */}
                    <List spacing={4}>
                        {currentItems.map((result) => (
                            <ListItem 
                            p={4} 
                            shadow="md" 
                            borderWidth="1px" 
                            borderRadius="md"
                            cursor="pointer"
                            transition="all 0.2s"
                            _hover={{
                                shadow: 'lg',
                                transform: 'translateY(-2px)',
                                borderColor: 'gray.300',
                                bg: 'gray.50'
                            }}
                            >
                            <HStack justifyContent="space-between">
                                <HStack alignItems='center'>
                                <Box 
                                    boxSize='50px' 
                                    bg='gray.200' 
                                    borderRadius='full' 
                                    mr={4}
                                />
                                <VStack alignItems='start' spacing={1}>
                                    <Text fontWeight='bold' fontSize="lg">{result.name}</Text>
                                    <Text color="gray.600">{result.address}</Text>
                                </VStack>
                                </HStack>
                                <HStack>
                                <Text color="gray.500" marginBottom={0}>{result.rating}</Text>
                                <Icon as={StarIcon} color="yellow.400" ml={1} />
                                </HStack>
                            </HStack>
                            </ListItem>
                        ))}
                        </List>
                </Box>
            )}
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
        </Box>
    );
};

export default SearchByZipcode;

