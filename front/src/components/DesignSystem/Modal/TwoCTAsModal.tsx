import React from 'react';
import Modal from './Modal';
import Button from '../Button/Button';
import ModalBody from './ModalBody';
import ModalHeader from './ModalHeader';

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
        <Modal isOpen={isOpen}>
            <ModalHeader>
                <span>Are you sure ?</span>
            </ModalHeader>
            <ModalBody>
                <Button onClick={onClose}>
                    <span>Cancel</span>
                </Button>
                <Button onClick={accept}>
                    <span>Accept</span>
                </Button>
            </ModalBody>
        </Modal>
    )
};

export default TwoCTAsModal;
