import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from '@windmill/react-ui'

const TwoCTAsModal = ({isOpen, onAccept}) => {
    function accept() {
        onAccept()
        closeModal()
    }

    function closeModal() {
        isModalOpen = false
    }
    
    return (
        <Modal isOpen={isOpen} onClose={closeModal}>
                <ModalHeader>Are you sure ?</ModalHeader>
                <ModalBody className='flex place-content-center'>
                    <Button className="w-full sm:w-auto" layout="outline" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button className="w-full sm:w-auto" onClick={accept}>
                        Accept
                    </Button>
                </ModalBody>
        </Modal>
    )
}

export default TwoCTAsModal;