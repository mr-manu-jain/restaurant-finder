// src/pages/TeamPage.jsx
import React from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  SimpleGrid, 
  Text, 
  VStack,
  Image,
  useColorModeValue
} from '@chakra-ui/react';

const TeamMember = ({ name, role }) => {
  return (
    <VStack 
      spacing={4} 
      p={6}
      bg={useColorModeValue('white', 'gray.800')}
      borderRadius="lg"
      boxShadow="sm"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-4px)', boxShadow: 'md' }}
    >
      <Box 
        boxSize="200px"
        bg="gray.200"
        borderRadius="md"
        overflow="hidden"
      >
        <Image
          src="/placeholder-profile.jpg"
          alt={name}
          objectFit="cover"
          w="100%"
          h="100%"
        />
      </Box>
      <Heading size="md" textAlign="center">{name}</Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="sm">
        {role}
      </Text>
    </VStack>
  );
};

const TeamPage = () => {
  const teamMembers = [
    { name: 'RAHUL KANWAL', role: 'FULL STACK DEVELOPER' },
    { name: 'MANU JAIN', role: 'FULL STACK DEVELOPER' },
    { name: 'KARTIK CHINDARKAR', role: 'FULL STACK DEVELOPER' },
    { name: 'VANDANA SATISH', role: 'FULL STACK DEVELOPER' }
  ];

  return (
    <Box minH="100vh">
      <Box 
        h="300px"
        position="relative"
        bgImage="url('/team-hero-image.jpg')"
        bgPosition="center"
        bgSize="cover"
        bgRepeat="no-repeat"
        mb={12}
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="blackAlpha.600"
        />
        <Container maxW="container.xl" h="full" position="relative">
          <VStack
            position="absolute"
            bottom="50%"
            transform="translateY(50%)"
            color="white"
            spacing={4}
            textAlign="center"
            w="full"
          >
            <Heading size="2xl">MEET THE TEAM</Heading>
            <Text fontSize="lg">Get to know the team that creates this app for you</Text>
          </VStack>
        </Container>
      </Box>

      <Container maxW="container.xl" py={8}>
        <SimpleGrid 
          columns={{ base: 1, md: 2, lg: 4 }} 
          spacing={8}
          px={{ base: 4, md: 0 }}
        >
          {teamMembers.map((member, index) => (
            <TeamMember 
              key={index}
              name={member.name}
              role={member.role}
            />
          ))}
        </SimpleGrid>
      </Container>

      
    </Box>
  );
};

export default TeamPage;