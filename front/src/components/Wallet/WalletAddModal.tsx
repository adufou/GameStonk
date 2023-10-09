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
import MarketplaceModel from '@/models/marketplace.model';
import WalletModel from '@/models/wallet.model';

interface WalletAddModalProps {
    isOpen: boolean;
    closeModal: () => void;
    marketplace: MarketplaceModel;
}

const WalletAddModal = ({
    isOpen, closeModal, marketplace,
}: WalletAddModalProps): React.ReactElement => {
    const [newWalletName, setWalletName] = useState('');

    const queryClient = useQueryClient();

    const handleAddWalletMutationSuccess = async (): Promise<void> => {
        await queryClient.invalidateQueries(['marketplaces', marketplace.id, 'wallets']);
        closeModal();
    };

    const addWalletMutation = useMutation(
        (newWallet: Partial<WalletModel>) => walletsApi.addWallet(newWallet),
        { onSuccess: handleAddWalletMutationSuccess },
    );

    const handleClickAddWalletButton = (): void => {
        addWalletMutation.mutate({
            marketplace: marketplace.id,
            name: newWalletName,
        });
    };

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
        setWalletName(e.target.value);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={closeModal}
        >
            <ModalHeader>
                <span>Add a Wallet</span>
            </ModalHeader>

            <Separator />

            <ModalBody>
                <Input
                    label="name"
                    value={newWalletName}
                    onChange={handleChangeInput}
                />
            </ModalBody>

            <Separator />

            <ModalFooter>
                <Button
                    className='wallet-add-modal__footer-button'
                    onClick={closeModal}
                >
                    <span>Cancel</span>
                </Button>
                <Button
                    className='wallet-add-modal__footer-button'
                    onClick={handleClickAddWalletButton}
                >
                    <span>Accept</span>
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default WalletAddModal;
