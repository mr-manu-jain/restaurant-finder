// src/components/RatingModal.jsx
import React from 'react';
import kitchenHouseTemplate from '../assets/kitchenHouseTemplate.jpg';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Text,
  Button,
  Textarea,
  HStack,
  Icon,
  Image,
  Box,
  useToast
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import axios from 'axios';

const RatingModal = ({ isOpen, onClose, restaurantName, restaurantId, onReviewSubmit }) => {
  const [rating, setRating] = React.useState(0);
  const [review, setReview] = React.useState('');
  const toast = useToast(); // Chakra UI hook for toast notifications
  
  const handleSubmit = async () => {
    try {
      const userData = JSON.parse(sessionStorage.getItem('userData'));
      const userName = userData.name;
      const userId = userData.oid;
      console.log('userData');
      console.log(userData);
      console.log('userName');
      console.log(userName);
      console.log('userId');
      console.log(userId);
      // Replace with your actual API endpoint
      const response = await axios.post('http://springboot-app-finedine-dev.us-east-1.elasticbeanstalk.com/api/reviews/create', {restaurantId, rating, review, userName, userId});

      // Show success toast notification
      toast({
        title: "Review Submitted",
        description: "Your review has been submitted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Reset form fields
      setRating(0);
      setReview('');

       // Trigger callback to reload reviews
       if (onReviewSubmit) {
        onReviewSubmit();
      }

      // Close modal after submission
      onClose();
    } catch (error) {
      // Handle error (show error toast)
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your review. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton position="absolute" right={2} top={2} />
        <ModalBody p={6}>
          <VStack spacing={6} align="center">
            <Box boxSize="60px" borderRadius="full" overflow="hidden">
              <Image 
                src={kitchenHouseTemplate}
                alt="Restaurant icon"
                boxSize="100%"
                objectFit="cover"
              />
            </Box>
            
            <Text fontSize="xl" fontWeight="bold">
              How was {restaurantName}?
            </Text>
            
            <Text fontSize="sm" color="gray.600" textAlign="center">
              Your feedback will be shared with this store and they'll be able to respond to you.
            </Text>

            <HStack spacing={2}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon
                  key={star}
                  as={StarIcon}
                  boxSize={8}
                  color={star <= rating ? "yellow.400" : "gray.200"}
                  cursor="pointer"
                  onClick={() => setRating(star)}
                  _hover={{ transform: 'scale(1.1)' }}
                  transition="all 0.2s"
                />
              ))}
            </HStack>

            <Textarea
              placeholder="Share your experience (optional)"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              resize="vertical"
              minH="100px"
            />

            <HStack spacing={4} width="100%">
              <Button variant="ghost" onClick={onClose} flex={1}>
                Skip
              </Button>
              <Button 
                colorScheme="teal" 
                isDisabled={!rating}
                flex={1}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RatingModal;