import React, { useEffect, useState } from 'react';
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Stage from '../components/Stage';
import { AuthenticatedTemplate } from "@azure/msal-react";
import SearchByZipcode from '../components/SearchByZipcode';

import { IdTokenData } from "../components/DataDisplay";
import HomePageContent from '../components/HomePageContent';


/***
 * Component to detail ID token claims with a description for each claim. For more details on ID token claims, please check the following links:
 * ID token Claims: https://docs.microsoft.com/en-us/azure/active-directory/develop/id-tokens#claims-in-an-id-token
 * Optional Claims:  https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-optional-claims#v10-and-v20-optional-claims-set
 */
export const Home = () => {
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();
  const navigate = useNavigate();
  const [searchZipcode, setSearchZipcode] = useState('');

  const handleSearch = (zipcode) => {
      setSearchZipcode(zipcode);
      navigate(`/zipcodesearch?zipcode=${zipcode}`);
  };

  return (
    <>
      <Stage 
                title="Find Your Next Meal"
                description="Discover great restaurants in your area"
                textboxText="Enter Zipcode"
                onSearch={handleSearch}
            />
      <HomePageContent />

    </>
  );
};