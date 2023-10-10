import React, { useState } from 'react';
import {
    MdEdit,
    MdRemove,
} from 'react-icons/md';
import {
    useMutation,
    useQueryClient,
} from 'react-query';
import ButtonXSmall from '@/components/DesignSystem/Button/ButtonXSmall';
import TwoCTAsModal from '@/components/DesignSystem/Modal/TwoCTAsModal';
import Tooltip from '@/components/DesignSystem/Tooltip/Tooltip';
import ConfigIcon from '@/components/Icon/ConfigIcon';
import WalletEditModal from '@/components/Wallet/WalletEditModal';
import walletsApi from '@/http/api/wallets/wallets.api';
import WalletModel from '@/models/wallet.model';

interface WalletCardProps {
    wallet: WalletModel;
}

const WalletCard = ({ wallet }: WalletCardProps): React.ReactElement => {
    const [isDeleteWalletModalOpen, setIsDeleteWalletModalOpen] = useState(false);
    const [isUpdateWalletModalOpen, setIsUpdateWalletModalOpen] = useState(false);
    
    const queryClient = useQueryClient();

    const handleDeleteWalletMutationSuccess = async (): Promise<void> => {
        await queryClient.invalidateQueries(['marketplaces']);
    };
    
    const deleteWalletMutation = useMutation(
        () => walletsApi.deleteWallet(wallet),
        { onSuccess: handleDeleteWalletMutationSuccess },
    );
    
    const handleClickDeleteWalletButton = (): void => {
        deleteWalletMutation.mutate();
    };

    function openModalDeleteWallet(): void {
        setIsDeleteWalletModalOpen(true);
    }

    function closeModalDeleteWallet(): void {
        setIsDeleteWalletModalOpen(false);
    }

    function openModalUpdateWallet(): void {
        setIsUpdateWalletModalOpen(true);
    }

    function closeModalUpdateWallet(): void {
        setIsUpdateWalletModalOpen(false);
    }
    
    return (
        <div className='wallet-card'>
            <span>
                {wallet.name}
            </span>

            <div className='wallet-card__buttons'>
                <Tooltip content="Edit wallet">
                    <ButtonXSmall onClick={openModalUpdateWallet}>
                        <ConfigIcon>
                            <MdEdit />
                        </ConfigIcon>
                    </ButtonXSmall>
                </Tooltip>

                <Tooltip content="Delete wallet">
                    <ButtonXSmall onClick={openModalDeleteWallet}>
                        <ConfigIcon>
                            <MdRemove />
                        </ConfigIcon>
                    </ButtonXSmall>
                </Tooltip>
            </div>

            <TwoCTAsModal
                isOpen={isDeleteWalletModalOpen}
                onAccept={handleClickDeleteWalletButton}
                onClose={closeModalDeleteWallet}
            />
            <WalletEditModal
                isOpen={isUpdateWalletModalOpen}
                closeModal={closeModalUpdateWallet}
                wallet={wallet}
            />
        </div>
    );
};

export default WalletCard;
