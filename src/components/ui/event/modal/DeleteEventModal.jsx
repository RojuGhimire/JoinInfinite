import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';

const DeleteEventModal = ({ isDeleteOpenModal, onCloseDeleteModal, onDelete,eventId }) => {

  return (
    <>
      <Modal isOpen={isDeleteOpenModal} onClose={onCloseDeleteModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this event?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={() => onDelete.mutate(eventId)}>
              Confirm Delete
            </Button>
            <Button variant="ghost" onClick={onCloseDeleteModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteEventModal;
