import React, { useEffect } from 'react';
import { MsalProvider, useMsal } from '@azure/msal-react';
import { EventType } from '@azure/msal-browser';
import { Routes, Route } from "react-router-dom";
import TeamPage from './pages/TeamPage';
import { PageLayout } from './components/PageLayout';
import { Home } from './pages/Home';
import RestaurantHome from './pages/RestaurantHome';
import SearchPage from './pages/SearchPage'; 
import { b2cPolicies, protectedResources } from './authConfig';
import { compareIssuingPolicy } from './utils/claimUtils';
import { ChakraProvider } from '@chakra-ui/react'
import userService from './services/userService';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import BusinessDashboard from './pages/business/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import ManageRestaurants from './pages/business/ManageRestaurants';
import './styles/App.css';
import { Box } from '@chakra-ui/react'
import ZipcodeSearch from './pages/ZipcodeSearch';
import { ProfilePage } from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';
import BusinessProtectedRoute from './components/business/BusinessProtectedRoute';

const Pages = () => {
    const { instance } = useMsal();

    useEffect(() => {
        const callbackId = instance.addEventCallback((event) => {
            if (
                (event.eventType === EventType.LOGIN_SUCCESS || event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) &&
                event.payload.account
            ) {
                const idToken = event.payload.idToken;
                if (idToken) {
                    sessionStorage.setItem('msal.id.token', idToken);
                }

                const userData = {
                    oid: event.payload.idTokenClaims.oid,
                    name: event.payload.idTokenClaims.given_name + ' ' + event.payload.idTokenClaims.family_name,
                    country: event.payload.idTokenClaims.country,
                    state: event.payload.idTokenClaims.state,
                    address: event.payload.idTokenClaims.streetAddress,
                    city: event.payload.idTokenClaims.city,
                    zipCode: event.payload.idTokenClaims.postalCode,
                    email: event.payload.idTokenClaims.emails[0],
                    role: event.payload.idTokenClaims.extension_Setupabusinessaccount ? "Owner" : "User"
                };
                
                userService.checkAndCreateUser(userData)
                    .then(response => {
                        sessionStorage.setItem('userData', JSON.stringify(response.data));
                    })
                    .catch(error => {
                        console.error('Error checking/creating user:', error);
                    });

                if (compareIssuingPolicy(event.payload.idTokenClaims, b2cPolicies.names.editProfile)) {
                    const originalSignInAccount = instance
                        .getAllAccounts()
                        .find(
                            (account) =>
                                account.idTokenClaims.oid === event.payload.idTokenClaims.oid &&
                                account.idTokenClaims.sub === event.payload.idTokenClaims.sub && 
                                compareIssuingPolicy(account.idTokenClaims, b2cPolicies.names.signUpSignIn)        
                        );

                    let signUpSignInFlowRequest = {
                        authority: b2cPolicies.authorities.signUpSignIn.authority,
                        account: originalSignInAccount,
                    };

                    instance.ssoSilent(signUpSignInFlowRequest);
                }

                if (compareIssuingPolicy(event.payload.idTokenClaims, b2cPolicies.names.forgotPassword)) {
                    let signUpSignInFlowRequest = {
                        authority: b2cPolicies.authorities.signUpSignIn.authority,
                        scopes: [
                            ...protectedResources.apiTodoList.scopes.read,
                            ...protectedResources.apiTodoList.scopes.write,
                        ],
                    };
                    instance.loginRedirect(signUpSignInFlowRequest);
                }
            }

            if (event.eventType === EventType.LOGIN_FAILURE) {
                if (event.error && event.error.errorMessage.includes('AADB2C90118')) {
                    const resetPasswordRequest = {
                        authority: b2cPolicies.authorities.forgotPassword.authority,
                        scopes: [],
                    };
                    instance.loginRedirect(resetPasswordRequest);
                }
            }

            if (event.eventType === EventType.LOGOUT_SUCCESS) {
                sessionStorage.removeItem('userData');
            }
        });

        return () => {
            if (callbackId) {
                instance.removeEventCallback(callbackId);
            }
        };
    }, [instance]);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/zipcodeSearch" element={<ZipcodeSearch />}/>  

            <Route element={<ProtectedRoute />}>
            <Route path="/search" element={<SearchPage />}/>
            <Route path="/profile" element={<ProfilePage />}/>      
            <Route path="/restaurant/:id" element={<RestaurantHome />}/>
            <Route path="/team" element={<TeamPage />}/>
            </Route>

            <Route element={<AdminProtectedRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />
            </Route>
            <Route element={<BusinessProtectedRoute />}>
                <Route path="/business" element={<ManageRestaurants />} />
                <Route path="/business/restaurants" element={<ManageRestaurants />} />
            </Route>
        </Routes>
    );
};

const App = ({ instance }) => {
    return (
        <ChakraProvider>
            <MsalProvider instance={instance}>
                <Box minH="100vh" display="flex" flexDirection="column">
                    <NavigationBar />
                    <Box flex="1">
                        <PageLayout>
                            <Pages />
                        </PageLayout>
                    </Box>
                    <Footer />
                </Box>
            </MsalProvider>
        </ChakraProvider>
    );
};

export default App;