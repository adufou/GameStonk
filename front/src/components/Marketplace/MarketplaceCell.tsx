import React, {
    useMemo,
    useState,
} from 'react';
import {
    MdAdd,
    MdChevronRight,
} from 'react-icons/md';
import { useQuery } from 'react-query';
import ButtonXSmall from '@/components/DesignSystem/Button/ButtonXSmall';
import Separator from '@/components/DesignSystem/Misc/Separator';
import Tooltip from '@/components/DesignSystem/Tooltip/Tooltip';
import ConfigIcon from '@/components/Icon/ConfigIcon';
import MarketplaceCard from '@/components/Marketplace/MarketplaceCard';
import WalletAddModal from '@/components/Wallet/WalletAddModal';
import WalletCell from '@/components/Wallet/WalletCell';
import marketplacesApi from '@/http/api/marketplaces/marketplaces.api';
import walletsApi from '@/http/api/wallets/wallets.api';
import MarketplaceModel from '@/models/marketplace.model';
import { optinalClassNames } from '@/tools/classNames';

interface MarketplaceCellProps {
    marketplace: MarketplaceModel;
}

const MarketplaceCell = ({ marketplace: propsMarketplace }: MarketplaceCellProps): React.ReactElement => {
    const [isAddWalletModalOpen, setIsAddWalletModalOpen] = useState(false);
    const [isWalletListOpen, setIsWalletListOpen] = useState(false);

    const {
        data: getMarketplaceData,
        isSuccess: getMarketplaceIsSuccess,
    } = useQuery(['marketplaces', propsMarketplace.id], () => marketplacesApi.getMarketplace(propsMarketplace.id));
    
    const {
        data: getWalletsFromMarketplaceData,
        isLoading: getWalletsFromMarketplaceIsLoading,
    } = useQuery(
        ['marketplaces', propsMarketplace.id, 'wallets'],
        
        // TODO : get le user courant
        () => walletsApi.getWalletsByMarketplaceForUser(propsMarketplace.id),
    );
    
    function openAddWalletModal(): void {
        setIsAddWalletModalOpen(true);
    }

    function closeAddWalletModal(): void {
        setIsAddWalletModalOpen(false);
    }

    const handleToggleOpenWalletList = (): void => {
        setIsWalletListOpen(!isWalletListOpen);
    };

    const transitionWalletListClassName = useMemo(() => {
        return optinalClassNames('marketplace-cell__body__transition', [
            {
                class: 'marketplace-cell__body__transition__open',
                condition: isWalletListOpen,
            },
        ]);
    }, [isWalletListOpen]);

    const transitionIconClassName = useMemo(() => {
        return optinalClassNames('marketplace-cell__body__headers__icon', [
            {
                class: 'marketplace-cell__body__headers__icon__rotated',
                condition: isWalletListOpen,
            },
        ]);
    }, [isWalletListOpen]);
    
    const toggleOpenMarketplaceListTooltipContent = useMemo(() => {
        return isWalletListOpen ? 'Close wallet list' : 'Open wallet list';
    }, [isWalletListOpen]);

    const walletsFromServer = useMemo(() => {
        if (!getWalletsFromMarketplaceIsLoading && getWalletsFromMarketplaceData) {
            return getWalletsFromMarketplaceData.body.map(wallet => (
                <WalletCell
                    key={'wallet-cell' + String(wallet.id)}
                    wallet={wallet}
                />
            ));
        }
        
        return (<></>);
    }, [getWalletsFromMarketplaceData]);
    
    if (getMarketplaceIsSuccess) {
        return (
            <div className='marketplace-cell'>
                <MarketplaceCard marketplace={getMarketplaceData?.body} />

                <Separator className='marketplace-cell__separator' />

                <div className='marketplace-cell__body'>
                    <div className='marketplace-cell__body__headers'>
                        <div className='marketplace-cell__body__headers__title'>
                            <Tooltip content={toggleOpenMarketplaceListTooltipContent}>
                                <ButtonXSmall onClick={handleToggleOpenWalletList}>
                                    <ConfigIcon>
                                        <MdChevronRight className={transitionIconClassName}/>
                                    </ConfigIcon>
                                </ButtonXSmall>
                            </Tooltip>
                            <span>
                        WALLETS
                            </span>
                        </div>
                        <div>
                            <Tooltip content='Add a wallet'>
                                <ButtonXSmall onClick={openAddWalletModal}>
                                    <ConfigIcon>
                                        <MdAdd />
                                    </ConfigIcon>
                                </ButtonXSmall>
                            </Tooltip>
                        </div>
                    </div>
                    
                    <div className={transitionWalletListClassName}>
                        <div className='marketplace-cell__body__wallet-list'>
                            {walletsFromServer}
                        </div>
                    </div>
                </div>

                <WalletAddModal
                    isOpen={isAddWalletModalOpen}
                    closeModal={closeAddWalletModal}
                    marketplace={getMarketplaceData?.body}
                />
            </div>
        );
    }

    return (<></>);
};

export default MarketplaceCell;
