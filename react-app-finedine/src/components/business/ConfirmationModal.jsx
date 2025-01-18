// src/components/business/ConfirmationModal.jsx
import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button
} from '@chakra-ui/react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{message}</ModalBody>
        
          <Button colorScheme="red" mr={3} onClick={onConfirm}>
            Confirm Delete
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;