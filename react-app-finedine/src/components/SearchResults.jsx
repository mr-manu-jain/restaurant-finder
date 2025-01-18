import React, { useEffect, useState } from 'react';
import { List, ListItem, Box, HStack, VStack, Text, Icon, Image, filter } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls
import { StarIcon } from '@chakra-ui/icons';
import kitchenHouseTemplate from '../assets/kitchenHouseTemplate.jpg';


const SearchResults = ({ filterType, filterValue }) => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [ratings, setRatings] = useState({});
  const [imageSources, setImageSources] = useState({}); // Store image sources for each restaurant
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Initialize an empty request object
  let request = {};
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      var response;
      try {
        console.log(filterType);
        console.log(filterValue);
        switch (filterType) {
          case "Ratings":
            response = await axios.post('http://springboot-app-finedine-dev.us-east-1.elasticbeanstalk.com/api/restaurant/getRestaurantDetails', {rating: filterValue.value, ratingParameter: filterValue.condition });
            setResults(response.data.restaurants);
            break;
          case "Price":
            response = await axios.post('http://springboot-app-finedine-dev.us-east-1.elasticbeanstalk.com/api/restaurant/getRestaurantDetails', {price: filterValue.value, priceParameter: filterValue.condition });
            setResults(response.data.restaurants);
            break;
          case "Cuisine":
            response = await axios.post('http://springboot-app-finedine-dev.us-east-1.elasticbeanstalk.com/api/restaurant/getRestaurantDetails', {cuisines: filterValue.cuisine});
            setResults(response.data.restaurants);
            break;
          case "FoodType":
            response = await axios.post('http://springboot-app-finedine-dev.us-east-1.elasticbeanstalk.com/api/restaurant/getRestaurantDetails', {foodTypes: filterValue.foodtype});
            setResults(response.data.restaurants);
            break;
          case "Name":
            response = await axios.post('http://springboot-app-finedine-dev.us-east-1.elasticbeanstalk.com/api/restaurant/getRestaurantDetails', {restaurantName: filterValue.name});
            setResults(response.data.restaurants);
            break;
          default:
            console.warn('Unknown filter type');
        }
        if (response) {
          fetchRatingsForRestaurants(response.data.restaurants);
          fetchImagesForRestaurants(response.data.restaurants); // Fetch images for all restaurants
        }
      } catch (err) {
          setError('An error occurred while fetching data.');
          console.error(err);
      } finally {
          setLoading(false);
      }
    };

    const fetchRatingsForRestaurants = async (restaurants) => {
      try {
        const ratingsData = {};
        for (const restaurant of restaurants) {
          // Assuming the API endpoint to get ratings is something like this
          const ratingResponse = await axios.post(`http://springboot-app-finedine-dev.us-east-1.elasticbeanstalk.com/api/restaurant/getRatingsForRestaurant`, {restaurantId: restaurant.id});
          ratingsData[restaurant.id] = ratingResponse.data.averageRating; 
        }
        setRatings(ratingsData);
      } catch (err) {
        console.error('Error fetching ratings:', err);
      }
    };

    fetchData();
  }, [filterType, filterValue]);

  const fetchImagesForRestaurants = async (restaurants) => {
    try {
      const imageData = {};
      for (const restaurant of restaurants) {
        if (restaurant.imageUrl) {
          // Fetch the image using a POST request
          const imageResponse = await axios.post(
            `http://springboot-app-finedine-dev.us-east-1.elasticbeanstalk.com/api/restaurant/image/${restaurant.imageUrl}`,
            {},
            { responseType: 'blob' } // Ensure we get binary data
          );
          const imageBlob = new Blob([imageResponse.data]);
          const imageObjectURL = URL.createObjectURL(imageBlob); // Create a URL for the blob
          imageData[restaurant.id] = imageObjectURL; // Map the image URL to the restaurant ID
        }
      }
      setImageSources(imageData); // Update state with all fetched images
    } catch (err) {
      console.error('Error fetching images:', err);
    }
  };

  return (
    <List spacing={4}>
      {results.map((result) => (
        <ListItem 
          key={result.id} 
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
          onClick={() => navigate(`/restaurant/${result.id}`)}
        >
          <HStack justifyContent="space-between">
            <HStack alignItems='center'>
               {/* Restaurant Image */}
               <Box
                boxSize='50px'
                borderRadius='md' // Rounded square shape
                overflow="hidden" // Ensures the image fits within the box
                bg='gray.200' // Placeholder background color
                mr={4}
              >
                {imageSources[result.id] ? (
                  <Image 
                    src={imageSources[result.id]} 
                    alt={`${result.restaurantName} image`} 
                    objectFit="cover" // Ensures the image covers the box
                    boxSize="100%" 
                  />
                ) : (
                  <Image 
                  src={kitchenHouseTemplate} 
                  alt="Placeholder" 
                  objectFit="cover" 
                  width="100%" 
                  height="100%" 
                />
                )}
              </Box>
              {/* Restaurant details */}
              <VStack alignItems='start' spacing={1}>
                <Text fontWeight='bold' fontSize="lg">{result.restaurantName}</Text>
                <Text color="gray.600">Cuisines: {result.cuisines ? result.cuisines.join(', ') : 'N/A'}</Text>
                <Text color="gray.600">Food Types: {result.foodTypes ? result.foodTypes.join(', ') : 'N/A'}</Text>
                <Text color="gray.600">Average Price: {result.averagePrice}</Text>
                <HStack>                
                  <Text color="gray.600" marginBottom={0}>Rating: {parseFloat(ratings[result.id]).toFixed(1) || 'Not available'}</Text>
                  <Icon as={StarIcon} color="yellow.400" ml={1} />
                </HStack>
              </VStack>
            </HStack>
          
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};

export default SearchResults;

