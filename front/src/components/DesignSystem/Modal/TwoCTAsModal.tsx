import React from 'react';
import Button from '@/components/DesignSystem/Button/Button';
import Separator from '@/components/DesignSystem/Misc/Separator';
import Modal from '@/components/DesignSystem/Modal/Modal';
import ModalFooter from '@/components/DesignSystem/Modal/ModalFooter';
import ModalHeader from '@/components/DesignSystem/Modal/ModalHeader';

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
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalHeader>
                <span>Are you sure ?</span>
            </ModalHeader>

            <Separator />
            
            <ModalFooter>
                <Button
                    className='two-ctas-modal__footer-button'
                    onClick={onClose}
                >
                    <span>Cancel</span>
                </Button>
                <Button
                    className='two-ctas-modal__footer-button'
                    onClick={accept}
                >
                    <span>Accept</span>
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default TwoCTAsModal;
