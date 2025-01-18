import React, { useState } from 'react';
import { Box, Flex, Heading, Text, Input, Button, InputGroup } from '@chakra-ui/react';
import stageImage from '../assets/stage.png';

const Stage = ({ title, description, textboxText, onSearch }) => {
    const [zipcode, setZipcode] = useState('');

    const handleSearch = () => {
        onSearch(zipcode);
    };

    return (
        <Box
            bgImage={`url(${stageImage})`}
            bgSize="cover"
            bgPosition="center"
            height={["130px", "230px", "330px"]}
            position="relative"
            mb={0}
        >
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bg="rgba(0, 0, 0, 0.5)"
            />

            <Flex
                direction="column"
                align="center"
                justify="center"
                height="100%"
                position="relative"
                zIndex={1}
                color="white"
                textAlign="center"
                px={[4, 6, 8]}
            >
                <Heading as="h1" size={["lg", "xl", "2xl"]} mb={[2, 3, 4]}>
                    {title}
                </Heading>
                <Text fontSize={["sm", "md", "lg"]} mb={[3, 4, 5]} maxW="600px">
                    {description}
                </Text>

                <Flex
                    width={["90%", "80%", "60%"]}
                    maxWidth="500px"
                    direction={["column", "row"]}
                    align="center"
                >
                    <InputGroup size="lg">
                        <Input
                            placeholder={textboxText}
                            borderRadius="md"
                            bg="white"
                            color="black"
                            value={zipcode}
                            onChange={(e) => setZipcode(e.target.value)}
                            mr={[0, 2]}
                            mb={[2, 0]}
                        />
                    </InputGroup>
                    <Button 
                        size="lg" 
                        colorScheme="blackAlpha"
                        onClick={handleSearch}
                        width={["100%", "auto"]}
                    >
                        Search
                    </Button>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Stage;