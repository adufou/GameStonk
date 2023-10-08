import React, { useState } from 'react';
import {
    MdEdit,
    MdOutlineAccountBalanceWallet,
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
import MarketplaceEditModal from '@/components/Marketplace/MarketplaceEditModal';
import marketplacesApi from '@/http/api/marketplaces/marketplaces.api';
import MarketplaceModel from '@/models/marketplace.model';

interface MarketplaceCardProps {
    marketplace: MarketplaceModel;
}

const MarketplaceCard = ({ marketplace }: MarketplaceCardProps): React.ReactElement => {
    const [isDeleteMarketplaceModalOpen, setIsDeleteMarketplaceModalOpen] = useState(false);
    const [isUpdateMarketplaceModalOpen, setIsUpdateMarketplaceModalOpen] = useState(false);

    const queryClient = useQueryClient();
    
    const handleDeleteMarketplaceMutationSuccess = async (): Promise<void> => {
        await queryClient.invalidateQueries(['servers']);
    };
    
    const deleteMarketplaceMutation = useMutation(
        () => marketplacesApi.deleteMarketplace(marketplace),
        { onSuccess: handleDeleteMarketplaceMutationSuccess },
    );

    const handleClickDeletMarketplaceButton = (): void => {
        deleteMarketplaceMutation.mutate();
    };

    function openModalDeleteMarketplace(): void {
        setIsDeleteMarketplaceModalOpen(true);
    }

    function closeModalDeleteMarketplace(): void {
        setIsDeleteMarketplaceModalOpen(false);
    }

    function openModalUpdateMarketplace(): void {
        setIsUpdateMarketplaceModalOpen(true);
    }

    function closeModalUpdateMarketplace(): void {
        setIsUpdateMarketplaceModalOpen(false);
    }

    return (
        <div className='marketplace-card'>
            <span>
                {marketplace.name}
            </span>

            <div className='marketplace-card__buttons'>
                <Tooltip content="Go to wallets">
                    <ButtonXSmall onClick={undefined /* noop */}>
                        <ConfigIcon>
                            <MdOutlineAccountBalanceWallet />
                        </ConfigIcon>
                    </ButtonXSmall>
                </Tooltip>

                <Tooltip content="Edit marketplace">
                    <ButtonXSmall onClick={openModalUpdateMarketplace}>
                        <ConfigIcon>
                            <MdEdit />
                        </ConfigIcon>
                    </ButtonXSmall>
                </Tooltip>

                <Tooltip content="Delete marketplace">
                    <ButtonXSmall onClick={openModalDeleteMarketplace}>
                        <ConfigIcon>
                            <MdRemove />
                        </ConfigIcon>
                    </ButtonXSmall>
                </Tooltip>
            </div>

            <TwoCTAsModal 
                isOpen={isDeleteMarketplaceModalOpen}
                onAccept={handleClickDeletMarketplaceButton}
                onClose={closeModalDeleteMarketplace}
            /> 
            <MarketplaceEditModal
                isOpen={isUpdateMarketplaceModalOpen}
                closeModal={closeModalUpdateMarketplace}
                marketplace={marketplace}
            />
        </div>
    );
};

export default MarketplaceCard;
