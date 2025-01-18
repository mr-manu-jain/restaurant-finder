import React, { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { b2cPolicies } from '../authConfig';
import { MsalAuthenticationTemplate } from '@azure/msal-react';
import { InteractionType, EventType } from '@azure/msal-browser';
import { loginRequest } from "../authConfig";
import {
    Box,
    VStack,
    Heading,
    Text,
    Button,
    Flex,
    Container,
} from "@chakra-ui/react";
export const ProfilePage = () => {
    const authRequest = {
        ...loginRequest,
    };

    return (
        <MsalAuthenticationTemplate
            interactionType={InteractionType.Redirect}
            authenticationRequest={authRequest}
        >
            <ProfilePageContent />
        </MsalAuthenticationTemplate>
    );
};

const ProfilePageContent = () => {
    const { instance } = useMsal();
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const updateUserInfo = () => {
            const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
            if (storedUserData) { 
                setUserData(storedUserData);
            } else {
                setUserData({});
            }
        };

        updateUserInfo();

        const callbackId = instance.addEventCallback((event) => {
            if (event.eventType === EventType.LOGIN_SUCCESS ||
                event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) {
                updateUserInfo();
            }
        });

        return () => {
            if (callbackId) {
                instance.removeEventCallback(callbackId);
            }
        };
    }, [instance]);

    const handleEditProfile = () => {
        instance.loginRedirect({
            authority: b2cPolicies.authorities.editProfile.authority,
            scopes: []
        }).catch((error) => console.log(error));
    };

    const handleResetPassword = () => {
        instance.loginRedirect({
            authority: b2cPolicies.authorities.resetPassword.authority,
            scopes: []
        }).catch((error) => console.log(error));
    };

    const fullName = `${userData.name || ''}`.trim();
    const address = `${userData.address || ''}, ${userData.state || ''} ${userData.zipCode || ''}`.trim();

    return (
        <VStack spacing={0} align="stretch">

                <Box bg="blue.600" py={40} textAlign="center" height="40vh" display="flex" alignItems="center" justifyContent="center">
                <Heading as="h1" size="3xl" color="white">Profile</Heading>
            </Box>
            
            <Container maxW="2xl" py={8}>
                <Box bg="white" rounded="lg" shadow="lg" p={8}>
                    <VStack spacing={6} align="center">
                        <Box textAlign="center">
                            <Text fontWeight="bold" fontSize="2xl" color="gray.800">{fullName}</Text>
                        </Box>
                        
                        <Box textAlign="center">
                            <Text fontWeight="bold" color="gray.600" mb={1}>Address</Text>
                            <Text fontSize="lg" color="gray.800">{address}</Text>
                        </Box>
                        
                        <Box textAlign="center">
                            <Text fontWeight="bold" color="gray.600" mb={1}>Email</Text>
                            <Text fontSize="lg" color="gray.800">{userData.email}</Text>
                        </Box>

                        <Flex justify="center" gap={4} mt={4}>
                            <Button
                                onClick={handleEditProfile}
                                bg="gray.100"
                                color="gray.800"
                                _hover={{ bg: "gray.200", color: "#0078D4" }}
                                fontSize="sm"
                                fontWeight="medium"
                            >
                                Edit Profile
                            </Button>
                            <Button
                                onClick={handleResetPassword}
                                bg="gray.100"
                                color="gray.800"
                                _hover={{ bg: "gray.200", color: "#0078D4" }}
                                fontSize="sm"
                                fontWeight="medium"
                            >
                                Reset Password
                            </Button>
                        </Flex>
                    </VStack>
                </Box>
            </Container>
        </VStack>
    );
};