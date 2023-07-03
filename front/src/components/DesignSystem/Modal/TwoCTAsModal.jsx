import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from '@windmill/react-ui'

const TwoCTAsModal = ({isOpen, onAccept, onClose}) => {
    function accept() {
        onAccept()
        onClose()
    }
    
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
                <ModalHeader>Are you sure ?</ModalHeader>
                <ModalBody className='flex place-content-center'>
                    <Button className="w-full sm:w-auto" layout="outline" onClick={onClose}>
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