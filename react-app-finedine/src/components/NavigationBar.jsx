import React, { useState, useEffect } from 'react';
import { Box, Flex, Button, Text, Image, Menu, MenuButton, MenuList, MenuItem, MenuDivider, IconButton, useDisclosure, Link } from '@chakra-ui/react';
import { ChevronDownIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import logo from '../assets/FineDine_Short.png';
import { useMsal } from '@azure/msal-react';
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { EventType } from '@azure/msal-browser';

const SCROLL_THRESHOLD = 100;

const NavigationBar = () => {
    const { instance } = useMsal();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userGivenName, setUserGivenName] = useState('User');
    const [userRole, setUserRole] = useState('');
    const navigate = useNavigate();
    const { isOpen, onToggle } = useDisclosure();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const updateUserInfo = async () => {
            let retries = 0;
            const maxRetries = 5;
            
            while (retries < maxRetries) {
                const userData = JSON.parse(sessionStorage.getItem('userData'));
                if (userData) {
                    setIsAuthenticated(true);
                    setUserGivenName(userData.name.split(' ')[0] || 'User');
                    setUserRole(userData.role || '');
                    break;
                } else {
                    retries++;
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
            }
    
            if (retries === maxRetries) {
                setIsAuthenticated(false);
                setUserGivenName('User');
                setUserRole('');
            }
        };
    
        updateUserInfo();
    
        const callbackId = instance.addEventCallback((event) => {
            if (event.eventType === EventType.LOGIN_SUCCESS || 
                event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS || 
                event.eventType === EventType.LOGOUT_SUCCESS) {
                updateUserInfo();
            }
        });
    
        const handleScroll = () => {
            setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
            if (callbackId) {
                instance.removeEventCallback(callbackId);
            }
            window.removeEventListener('scroll', handleScroll);
        };
    }, [instance]);

    const handleLoginRedirect = () => {
        instance.loginRedirect();
    };

    const handleLogoutRedirect = () => {
        sessionStorage.removeItem('userData');
        instance.logoutRedirect();
    };

    const handleSearch = () => {
        navigate(`/search`);
    };

    const handleManageRestaurants = () => {
        navigate(`/business`);
    };

    return (
        <Box bg={isScrolled ? "#ffffff" : "transparent"} px={[2, 4, 6]} py={2} boxShadow={isScrolled ? "md" : "none"} position="fixed" top={0} left={0} right={0} zIndex={1000} transition="all 0.3s ease-in-out">
            <Flex justify="space-between" align="center" height="45px">
                <Flex align="center">
                    <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
                        <Flex align="center">
                            <Image src={logo} alt="Logo" boxSize="32px" mr={2} />
                            <Text fontSize="xl" fontWeight="bold" ml={2} mt={2} color={isScrolled ? "inherit" : "white"}>
                                FineDine
                            </Text>
                        </Flex>
                    </Link>
                    {isAuthenticated && (
                        <Flex ml={6} display={["none", "none", "flex"]}>
                            <Button variant={isScrolled ? "outline" : "solid"} colorScheme={isScrolled ? "blue" : "whiteAlpha"} onClick={handleSearch} mr={4} size="md">
                                Search Restaurants
                            </Button>
                            {userRole === 'Owner' && (
                                <Button variant={isScrolled ? "outline" : "solid"} colorScheme={isScrolled ? "blue" : "whiteAlpha"} onClick={handleManageRestaurants} mr={4} size="md">
                                    Manage Restaurants
                                </Button>
                            )}
                            {userRole === 'Admin' && (
                                <Button variant={isScrolled ? "outline" : "solid"} colorScheme={isScrolled ? "red" : "whiteAlpha"} onClick={() => navigate('/admin')} mr={4} size="md">
                                    Admin
                                </Button>
                            )}
                        </Flex>
                    )}
                </Flex>
                <Flex display={["none", "none", "flex"]} align="center">
                    {isAuthenticated ? (
                        <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} size="md" colorScheme={isScrolled ? "blue" : "whiteAlpha"}>
                                {userGivenName}
                            </MenuButton>
                            <MenuList minW="150px">
                                <MenuItem onClick={() => navigate('/profile')}>My Profile</MenuItem>
                                <MenuDivider />
                                <MenuItem onClick={handleLogoutRedirect}>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    ) : (
                        <Button colorScheme={isScrolled ? "blue" : "whiteAlpha"} onClick={handleLoginRedirect} size="md">
                            Sign Up/Login
                        </Button>
                    )}
                </Flex>
                <IconButton display={["flex", "flex", "none"]} onClick={onToggle} icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />} variant="ghost" aria-label="Toggle Navigation" size="sm" color={isScrolled ? "inherit" : "white"} />
            </Flex>
            {isOpen && (
                <Box py={4} display={["block", "block", "none"]} bg={isScrolled ? "white" : "rgba(0,0,0,0.7)"}>
                    {isAuthenticated && (
                        <>
                            <Button variant="outline" colorScheme={isScrolled ? "blue" : "whiteAlpha"} onClick={handleSearch} w="full" mb={4} size="sm">
                                Search Restaurants
                            </Button>
                            {userRole === 'Owner' && (
                                <Button variant="outline" colorScheme={isScrolled ? "blue" : "whiteAlpha"} onClick={handleManageRestaurants} w="full" mb={4} size="sm">
                                    Manage Restaurants
                                </Button>
                            )}
                            {userRole === 'Admin' && (
                                <Button variant="outline" colorScheme={isScrolled ? "red" : "whiteAlpha"} onClick={() => navigate('/admin')} w="full" mb={4} size="sm">
                                    Admin
                                </Button>
                            )}
                        </>
                    )}
                    {isAuthenticated ? (
                        <>
                            <Button w="full" mb={2} onClick={() => navigate('/profile')} size="sm" colorScheme={isScrolled ? "blue" : "whiteAlpha"}>
                                My Profile
                            </Button>
                            <Button w="full" onClick={handleLogoutRedirect} size="sm" colorScheme={isScrolled ? "blue" : "whiteAlpha"}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Button w="full" colorScheme={isScrolled ? "blackAlpha" : "whiteAlpha"} onClick={handleLoginRedirect} size="sm">
                            Sign Up/Login
                        </Button>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default NavigationBar;