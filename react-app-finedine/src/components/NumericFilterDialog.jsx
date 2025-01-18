// src/components/NumericFilterDialog.jsx
import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Select, Input } from '@chakra-ui/react';

const NumericFilterDialog = ({ type, isOpen, onClose, onSubmit }) => {
  const [condition, setCondition] = useState('greater than');
  const [value, setValue] = useState('');

  const handleConditionChange = (e) => setCondition(e.target.value);
  const handleValueChange = (e) => setValue(e.target.value);

  const handleSubmit = () => {
    onSubmit({ condition, value });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Set {type} Filter</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Select value={condition} onChange={handleConditionChange}>
            <option value='greater than'>Greater than</option>
            <option value='less than'>Less than</option>
          </Select>
          <Input
            placeholder={`Enter ${type.toLowerCase()} value`}
            type='number'
            value={value}
            onChange={handleValueChange}
          />
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

export default NumericFilterDialog;
