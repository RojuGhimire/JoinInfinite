import { Button, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'

const DeleteModal = ({ isDeleteOpen, onDeleteClose, deleteUser, id, setSelectedUserId }) => {
    return (
        <Modal isOpen={isDeleteOpen} onClose={() => { onDeleteClose(); setSelectedUserId(""); }}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Are You Sure?</ModalHeader>
                <ModalCloseButton />
                <ModalFooter>
                    <Button colorScheme='red' onClick={() => deleteUser.mutate(id)} mr={3} >
                        Delete
                    </Button>
                    <Button variant='ghost' onClick={onDeleteClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default DeleteModal