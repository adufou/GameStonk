import React from 'react';
import Modal from './Modal';

interface TwoCTAsModalProps {
    isOpen: boolean;
    onAccept: () => void;
    onClose: () => void;
}

const TwoCTAsModal = ({ isOpen, onAccept, onClose }: TwoCTAsModalProps): React.ReactElement => {
    function accept(): void {
        onAccept();
        onClose();
    }

    return (
        // <Modal isOpen={isOpen} onClose={onClose}>
        <Modal >
            {/* <ModalHeader>Are you sure ?</ModalHeader>
            <ModalBody className='flex place-content-center'>
                <Button className="w-full sm:w-auto" layout="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button className="w-full sm:w-auto" onClick={accept}>
                    Accept
                </Button>
            </ModalBody> */}
        </Modal>
    );
};

export default TwoCTAsModal;
