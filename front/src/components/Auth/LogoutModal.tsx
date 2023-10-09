import React from 'react';
import TwoCTAsModal from '@/components/DesignSystem/Modal/TwoCTAsModal';
import { clearLocalToken } from '@/tools/localToken';
import redirect from '@/tools/redirect';

interface LogoutModalProps {
    isOpen: boolean
    closeModal: () => void,
}

const LogoutModal = ({
    isOpen, closeModal,
}: LogoutModalProps): React.ReactElement => {
    const handleClickLogoutButton = (): void => {
        clearLocalToken();
        redirect('/login');
    };
    
    return (
        <TwoCTAsModal
            isOpen={isOpen}
            onAccept={handleClickLogoutButton}
            onClose={closeModal}
        />
    );
};

export default LogoutModal;
