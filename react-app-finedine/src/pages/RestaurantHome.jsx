// src/pages/RestaurantHome.jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  VStack,
  HStack,
  Button,
  Icon,
  Image,
  useColorModeValue,
  Center,
  Grid,
  GridItem,
  Flex
} from '@chakra-ui/react';
import { useDisclosure, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { StarIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom'; // Import useParams
import kitchenHouseTemplate from '../assets/kitchenHouseTemplate.jpg';
import pastaImage from '../assets/pasta.jpg';
import burgerImage from '../assets/burger.jpeg';
import sushiImage from '../assets/sushi.jpg';
import RatingModal from '../components/RatingModal';
import axios from 'axios';
import RestaurantPagination from '../components/RestaurantPagination';

const MenuItem = ({ title, type, price }) => {
  return (
    <Grid
      templateColumns="60px 1fr auto"
      gap={4}
      p={6}
      borderBottomWidth="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      width="100%"
      alignItems="center"
    >
      <Box
        width="60px"
        height="60px"
        borderRadius="md"
        overflow="hidden"
      >
        <Image
          src={burgerImage}
          alt={title}
          objectFit="cover"
          width="100%"
          height="100%"
        />
      </Box>
      <GridItem>
        <Heading size="md" mb={1}>{title}</Heading>
        <Text color={useColorModeValue('gray.600', 'gray.400')}>
          {type}
        </Text>
      </GridItem>
      <GridItem alignSelf="start">
        <Text 
          fontSize="lg" 
          fontWeight="semibold" 
          color="teal.600"
        >
          ${price}
        </Text>
      </GridItem>
    </Grid>
  );
};

const ReviewItem = ({ userName, review, rating, onDelete, isDeletable }) => {
  return (
    <Grid
      templateColumns="120px 1fr"
      gap={4}
      p={6}
      borderBottomWidth="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      width="100%"
      alignItems="center"
    >
      <HStack spacing={1}>
        {[...Array(5)].map((_, i) => (
          <Icon
            key={i}
            as={StarIcon}
            color={i < rating ? "yellow.400" : "gray.300"}
            w={4}
            h={4}
          />
        ))}
      </HStack>
      <GridItem>
        <Heading size="md" mb={1}>{userName}</Heading>
        <Text color={useColorModeValue('gray.600', 'gray.400')}>
          {review}
        </Text>
      </GridItem>
      {isDeletable && (
        <IconButton
          icon={<DeleteIcon />}
          colorScheme="red"
          onClick={onDelete}
          aria-label="Delete Review"
        />
      )}
    </Grid>
  );
};


const RestaurantHome = () => {
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [restaurantDetails, setRestaurantDetails] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const { id } = useParams(); // Extract restaurant ID from URL
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageSrc, setImageSrc] = useState(null); // State for storing the fetched image URL
  const loggedInUser = JSON.parse(sessionStorage.getItem('userData'));
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  // Function to handle delete click
  const handleDeleteClick = (reviewId) => {
    setSelectedReviewId(reviewId);
    onOpen(); // Open the confirmation dialog
  };

  // Function to delete a review
  const deleteReview = async () => {
    try {
      await axios.post(`http://springboot-app-finedine-dev.us-east-1.elasticbeanstalk.com/api/reviews/deleteReview`, 
        { reviewId: selectedReviewId }
      );
      onClose(); // Close the dialog
      fetchReviews(); // Refresh reviews after deletion
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  // Pagination states
  const [currentMenuPage, setCurrentMenuPage] = useState(1);
  const [currentReviewPage, setCurrentReviewPage] = useState(1);

  const itemsPerPage = 5; // Adjust as needed

    // Calculate paginated data
    const indexOfLastMenuItem = currentMenuPage * itemsPerPage;
    const indexOfFirstMenuItem = indexOfLastMenuItem - itemsPerPage;
    const currentMenuItems = menuItems.slice(indexOfFirstMenuItem, indexOfLastMenuItem);
  
    const indexOfLastReview = currentReviewPage * itemsPerPage;
    const indexOfFirstReview = indexOfLastReview - itemsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);  

  useEffect(() => {
    // Fetch restaurant details and menu items
    const fetchRestaurantData = async () => {
      try {
        const response = await axios.post(`http://springboot-app-finedine-dev.us-east-1.elasticbeanstalk.com/api/restaurant/getRestaurant`, {restaurantId: id});
        setRestaurantDetails(response.data.restaurant);
        const menuItems = await axios.post(`http://springboot-app-finedine-dev.us-east-1.elasticbeanstalk.com/api/menu/getMenuDetails`, {restaurantId: id})
        setMenuItems(menuItems.data.menuList); 
        const rating = await axios.post(`http://springboot-app-finedine-dev.us-east-1.elasticbeanstalk.com/api/restaurant/getRatingsForRestaurant`, {restaurantId: id})
        setReviewRating(rating.data);
        setReviews(rating.data.reviews);
        
        // Fetch restaurant image
        if (response.data.restaurant.imageUrl) {
          const imageResponse = await axios.post(
            `http://springboot-app-finedine-dev.us-east-1.elasticbeanstalk.com/api/restaurant/image/${response.data.restaurant.imageUrl}`,
            {},
            { responseType: 'blob' } // Ensure we get binary data (blob)
          );
          const imageBlob = new Blob([imageResponse.data]);
          const imageObjectURL = URL.createObjectURL(imageBlob);
          setImageSrc(imageObjectURL); // Set the blob URL as the image source
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [id]);

  // Function to fetch reviews
  const fetchReviews = async () => {
    try {
      const ratingResponse = await axios.post(
        `http://springboot-app-finedine-dev.us-east-1.elasticbeanstalk.com/api/restaurant/getRatingsForRestaurant`,
        { restaurantId: id }
      );
      setReviewRating(ratingResponse.data);
      setReviews(ratingResponse.data.reviews);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };


  const handleRateClick = () => {
    setIsRatingModalOpen(true);
  };

  return (
    <Box minH="100vh">
      <Box 
        h="550px"
        position="relative"
        bgImage={`url(${kitchenHouseTemplate})`}
        bgPosition="center"
        bgSize="cover"
        bgRepeat="no-repeat"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="blackAlpha.400"
        />
        <Center h="full">
          <HStack
            bg="white"
            p="6"
            borderRadius="xl"
            boxShadow="xl"
            spacing={6}
            alignItems="start"
            maxW="container.md"
          >
            {/* Restaurant Details */}
            <VStack alignItems="start" spacing={3}>
              <Heading size="xl">{restaurantDetails.restaurantName}</Heading>
              {/* Restaurant Description (conditionally rendered) */}
              {restaurantDetails.description && (
                <Text fontStyle="italic" color="gray.600">
                  {restaurantDetails.description}
                </Text>
              )}
              <Text color="gray.600">Cuisines: {restaurantDetails.cuisines ? restaurantDetails.cuisines.join(', ') : 'N/A'}</Text>
              <Text color="gray.600">Food Types: {restaurantDetails.foodTypes ? restaurantDetails.foodTypes.join(', ') : 'N/A'}</Text>
              <Text color="gray.600">Average Price: {restaurantDetails.averagePrice}</Text>
              <Text color="gray.600">Address: {restaurantDetails.address}, {restaurantDetails.city}</Text>
              <Text color="gray.600">Timings: {restaurantDetails.openingTime} - {restaurantDetails.closingTime}</Text>
              <HStack spacing={2} justify="center">
                <HStack spacing={1}>
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      as={StarIcon}
                      color={i < Math.floor(reviewRating.averageRating) ? "yellow.400" : "gray.300"}
                      w={4}
                      h={4}
                    />
                  ))}
                </HStack>
                <Text fontSize="md" marginBottom={0} fontWeight="bold" color="gray.600">
                  {parseFloat(reviewRating.averageRating).toFixed(1)}
                </Text>
              </HStack>
              <Button
                colorScheme="teal"
                size="sm"
                leftIcon={<StarIcon />}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'md',
                }}
                transition="all 0.2s"
                onClick={handleRateClick}
              >
                Rate & Review
              </Button>
            </VStack>

            {/* Restaurant Image */}
            <Box
              width="200px"
              height="200px"
              borderRadius="md" // Rounded square shape
              overflow="hidden" // Ensures the image fits within the box
              bgColor={useColorModeValue('gray.200', 'gray.700')} // Placeholder background color
            >
              {imageSrc ? (
                <Image 
                  src={imageSrc} 
                  alt={`${restaurantDetails.restaurantName} image`} 
                  objectFit="cover" // Ensures the image covers the box
                  width="100%" 
                  height="100%" 
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
          </HStack>
        </Center>
      </Box>

      <Container maxW="container.xl" py={8}>
        <Heading as="h2" size="lg" mb={4}>Menu</Heading>
        <VStack spacing={0} borderWidth="1px" borderRadius="lg" bg={useColorModeValue('white', 'gray.800')}>
          {currentMenuItems.map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </VStack>
        <RestaurantPagination 
          totalItems={menuItems.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentMenuPage}
          onPageChange={setCurrentMenuPage}
        />

<Heading as="h2" size="lg" mt={8} mb={4}>Reviews</Heading>
<VStack spacing={0} borderWidth="1px" borderRadius="lg" bg={useColorModeValue('white', 'gray.800')}>
  {currentReviews.map((item, index) => (
    <ReviewItem 
    key={index} 
    {... item} 
    isDeletable={loggedInUser?.name === item.userName} // Check if the review belongs to the logged-in user
    onDelete={() => handleDeleteClick(item.id)}
    />

  ))}
</VStack>
<RestaurantPagination 
  totalItems={reviews.length}
  itemsPerPage={itemsPerPage}
  currentPage={currentReviewPage}
  onPageChange={setCurrentReviewPage}
/>


      
        
      </Container>
{/* Delete Confirmation Dialog */}
<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">Delete Review</AlertDialogHeader>
            <AlertDialogBody>Are you sure you want to delete this review? This action cannot be undone.</AlertDialogBody>
         
              <Button ref={cancelRef} onClick={onClose}>Cancel</Button>
              <Button colorScheme="red" onClick={deleteReview} ml={3}>Delete</Button>
          
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      

      <RatingModal 
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
        restaurantName={restaurantDetails.restaurantName}
        restaurantId={restaurantDetails.id}
        onReviewSubmit={fetchReviews} // Callback to reload reviews
      />
    </Box>
  );
};

export default RestaurantHome;