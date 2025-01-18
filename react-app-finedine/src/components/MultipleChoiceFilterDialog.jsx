// src/components/MultipleChoiceFilterDialog.jsx
import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, CheckboxGroup, VStack, Checkbox } from '@chakra-ui/react';

const MultipleChoiceFilterDialog = ({ isOpen, onClose, onSubmit, options, label }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (selected) => setSelectedOptions(selected);

  const handleSubmit = () => {
    onSubmit(selectedOptions);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select {label}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CheckboxGroup value={selectedOptions} onChange={handleOptionChange}>
            <VStack align="start">
              {options.map((option) => (
                <Checkbox key={option} value={option}>
                  {option}
                </Checkbox>
              ))}
            </VStack>
          </CheckboxGroup>
          <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalBody>
        <ModalFooter>
          
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MultipleChoiceFilterDialog;
