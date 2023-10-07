import React, { useState } from 'react';
import {
    MdEdit,
    MdOutlineAccountBalanceWallet,
    MdRemove,
} from 'react-icons/md';
import ButtonXSmall from '@/components/DesignSystem/Button/ButtonXSmall';
import TwoCTAsModal from '@/components/DesignSystem/Modal/TwoCTAsModal';
import Tooltip from '@/components/DesignSystem/Tooltip/Tooltip';
import ConfigIcon from '@/components/Icon/ConfigIcon';
import MarketplaceEditModal from '@/components/Marketplace/MarketplaceEditModal';
import marketplacesApi from '@/http/api/marketplaces/marketplaces.api';
import MarketplaceModel from '@/models/marketplace.model';
import { deleteMarketplace } from '@/stores/game/gamesReducer';
import store from '@/stores/globalStore';
import isCorrectStatusCodeOrNotModified from '@/tools/isCorrectStatusCodeOrNotModified';

interface MarketplaceCardProps {
    marketplace: MarketplaceModel;
}

const MarketplaceCard = ({ marketplace }: MarketplaceCardProps): React.ReactElement => {
    const [isDeleteMarketplaceModalOpen, setIsDeleteMarketplaceModalOpen] = useState(false);
    const [isUpdateMarketplaceModalOpen, setIsUpdateMarketplaceModalOpen] = useState(false);

    function acceptMarketplaceDeletion(): void {
        marketplacesApi.deleteMarketplace(marketplace)
            .then((response) => {
                if (isCorrectStatusCodeOrNotModified(response.status)) {
                    store.dispatch(deleteMarketplace(marketplace));
                }
            })
            .catch(e => console.warn(e));
    }

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
                onAccept={acceptMarketplaceDeletion}
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
