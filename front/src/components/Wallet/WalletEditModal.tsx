import React, {
    ChangeEvent,
    useState,
} from 'react';
import {
    useMutation,
    useQueryClient,
} from 'react-query';
import Button from '@/components/DesignSystem/Button/Button';
import Input from '@/components/DesignSystem/Input/Input';
import Separator from '@/components/DesignSystem/Misc/Separator';
import Modal from '@/components/DesignSystem/Modal/Modal';
import ModalBody from '@/components/DesignSystem/Modal/ModalBody';
import ModalFooter from '@/components/DesignSystem/Modal/ModalFooter';
import ModalHeader from '@/components/DesignSystem/Modal/ModalHeader';
import walletsApi from '@/http/api/wallets/wallets.api';
import WalletModel from '@/models/wallet.model';

interface WalletEditModalProps {
    isOpen: boolean;
    closeModal: () => void;
    wallet: WalletModel;
}

const WalletEditModal = ({
    isOpen, closeModal, wallet,
}: WalletEditModalProps): React.ReactElement => {
    const [newWalletName, setWalletName] = useState(wallet.name);

    const queryClient = useQueryClient();

    const handleEditWalletMutationSuccess = async (): Promise<void> => {
        await queryClient.invalidateQueries(['wallets', wallet.id]);
        await queryClient.invalidateQueries(['games']);
        closeModal();
    };

    const editWalletMutation = useMutation(
        (updatedWallet: WalletModel) => walletsApi.updateWallet(updatedWallet),
        { onSuccess: handleEditWalletMutationSuccess },
    );

    const handleClickEditWalletButton = (): void => {
        const updatedWallet = {
            ...wallet,
            name: newWalletName,
        };
        editWalletMutation.mutate(updatedWallet);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setWalletName(e.target.value);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={closeModal}
        >
            <ModalHeader>
                <span>Update {wallet.name}</span>
            </ModalHeader>

            <Separator />

            <ModalBody>
                <Input
                    label="Name"
                    value={newWalletName}
                    onChange={handleInputChange}
                />
            </ModalBody>

            <Separator />

            <ModalFooter>
                <Button
                    className='wallet-edit-modal__footer-button'
                    onClick={closeModal}
                >
                    <span>Cancel</span>
                </Button>
                <Button
                    className='wallet-edit-modal__footer-button'
                    onClick={handleClickEditWalletButton}
                >
                    <span>Accept</span>
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default WalletEditModal;
