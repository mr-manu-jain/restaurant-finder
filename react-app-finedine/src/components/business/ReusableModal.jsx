import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

const ReusableModal = ({ isOpen, onClose, title, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="xl">
      <ModalOverlay />
      <ModalContent maxHeight="90vh">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto" padding={6}>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ReusableModal;