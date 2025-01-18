import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Image, VStack, SimpleGrid, Container, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import burger1Image from '../assets/burger1.png';
import pasta1Image from '../assets/pasta1.png';
import noodles1Image from '../assets/noodles1.png';
import soup1Image from '../assets/soup1.png';
import mediterraneanCuisineImage from '../assets/mediterraneanCuisine.jpg';
import indianCuisineImage from '../assets/indianCuisine.jpg';
import chineseCuisineImage from '../assets/chineseCuisine.jpg';
import italianCuisineImage from '../assets/italianCuisine.jpg';

const HomePageContent = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const [isToastDisplayed, setIsToastDisplayed] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userDataString = sessionStorage.getItem('userData');
        setIsLoggedIn(!!userDataString);
      }, []);

    const categories = [
        { name: 'Burgers', description: 'Juicy grilled burgers', icon: burger1Image },
        { name: 'Noodles', description: 'Delicious noodle dishes', icon: noodles1Image },
        { name: 'Pasta', description: 'Classic Italian pasta', icon: pasta1Image },
        { name: 'Soup', description: 'Warm and comforting soups', icon: soup1Image }
    ];

    const cuisines = [
        { name: 'Indian Cuisine', description: 'Experience the rich spices of India', image: indianCuisineImage },
        { name: 'Mediterranean Cuisine', description: 'Fresh and healthy dishes from the Mediterranean', image: mediterraneanCuisineImage },
        { name: 'Chinese Cuisine', description: 'Savor the flavors of authentic Chinese dishes', image: chineseCuisineImage },
        { name: 'Italian Cuisine', description: 'Enjoy classic Italian flavors and recipes', image: italianCuisineImage }
    ];

    const handleCuisineClick = () => {
        if (isLoggedIn) {
            navigate('/search');
        } else if (!isToastDisplayed) {
            setIsToastDisplayed(true);
            toast({
                title: "Login Required",
                description: "Please login to continue",
                status: "info",
                duration: 2500,
                isClosable: true,
                onCloseComplete: () => setIsToastDisplayed(false)
            });
        }
    };

    return (
        <Container maxW="container.xl" centerContent>
            {/* Restaurant Categories Section */}
            <VStack spacing={12} width="full" mt={12}>
                <Text fontSize="2xl" fontWeight="bold">
                    Restaurant Categories
                </Text>
                <SimpleGrid columns={{ base: 2, md: 4 }} spacing={10}>
                    {categories.map((category) => (
                        <VStack key={category.name} textAlign="center">
                            <Image src={category.icon} alt={category.name} boxSize="80px" />
                            <Text fontWeight="semibold">{category.name}</Text>
                            <Text fontSize="sm">{category.description}</Text>
                        </VStack>
                    ))}
                </SimpleGrid>
            </VStack>

            {/* Explore Different Cuisines Section */}
            <VStack spacing={8} width="full" mt={16}>
                <Text fontSize="2xl" fontWeight="bold" alignSelf="flex-start">
                    Explore Different Cuisines
                </Text>
                <Text alignSelf="flex-start">Discover a variety of flavors</Text>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} width="full">
                    {cuisines.map((cuisine) => (
                        <Box 
                            key={cuisine.name} 
                            borderWidth={1} 
                            borderRadius="md" 
                            p={4} 
                            bg="#f9f9f9" 
                            boxShadow="sm" 
                            cursor="pointer"
                            onClick={handleCuisineClick}
                            _hover={{ boxShadow: "md" }}
                        >
                            <Flex>
                                <Image src={cuisine.image} alt={cuisine.name} boxSize="80px" mr={4} objectFit="cover" />
                                <VStack align="start" spacing={2}>
                                    <Text fontWeight="semibold">{cuisine.name}</Text>
                                    <Text>{cuisine.description}</Text>
                                </VStack>
                            </Flex>
                        </Box>
                    ))}
                </SimpleGrid>
            </VStack>
        </Container>
    );
}

export default HomePageContent;