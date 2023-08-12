import Button from '@/components/DesignSystem/Button/Button';
import Modal from '@/components/DesignSystem/Modal/Modal';
import ModalBody from '@/components/DesignSystem/Modal/ModalBody';
import ModalHeader from '@/components/DesignSystem/Modal/ModalHeader';
import React from 'react';

interface TwoCTAsModalProps {
    isOpen: boolean;
    onAccept: () => void;
    onClose: () => void;
}

const TwoCTAsModal = ({
    isOpen, onAccept, onClose, 
}: TwoCTAsModalProps): React.ReactElement => {
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
    );
};

export default TwoCTAsModal;
