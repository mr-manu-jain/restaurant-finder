import React from 'react';
import { Box, Flex, Link, Text, Container, VStack, HStack, Divider } from '@chakra-ui/react';

const Footer = () => {
    return (
        <Box bg="gray.50" color="gray.800" mt={20}>
            <Container maxW="container.xl" py={10}>
                <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="start">
                    <VStack align="start" mb={{ base: 8, md: 0 }}>
                        <Text fontWeight="bold" fontSize="lg" mb={2}>FineDine</Text>
                        <Text fontSize="sm">Discover great restaurants near you.</Text>
                    </VStack>
                    <HStack spacing={8} align="start">
                        <VStack align="start">
                            <Text fontWeight="bold" fontSize="sm" mb={2}>Company</Text>
                            <Link href="/about" fontSize="sm">About Us</Link>
                            <Link href="#" fontSize="sm">Careers</Link>
                            <Link href="#" fontSize="sm">Contact</Link>
                        </VStack>
                        <VStack align="start">
                            <Text fontWeight="bold" fontSize="sm" mb={2}>Support</Text>
                            <Link href="#" fontSize="sm">Help Center</Link>
                            <Link href="#" fontSize="sm">Safety Center</Link>
                            <Link href="#" fontSize="sm">Community Guidelines</Link>
                        </VStack>
                        <VStack align="start">
                            <Text fontWeight="bold" fontSize="sm" mb={2}>Legal</Text>
                            <Link href="#" fontSize="sm">Terms of Service</Link>
                            <Link href="#" fontSize="sm">Privacy Policy</Link>
                            <Link href="#" fontSize="sm">Cookie Policy</Link>
                        </VStack>
                    </HStack>
                </Flex>
                <Divider my={6} />
                <Flex justify="space-between" align="center" flexWrap="wrap">
                    <Text fontSize="sm">&copy; {new Date().getFullYear()} FineDine. All rights reserved.</Text>
                    <HStack spacing={4}>
                        <Link href="#" fontSize="sm">Facebook</Link>
                        <Link href="#" fontSize="sm">Twitter</Link>
                        <Link href="#" fontSize="sm">Instagram</Link>
                    </HStack>
                </Flex>
            </Container>
        </Box>
    );
};

export default Footer;