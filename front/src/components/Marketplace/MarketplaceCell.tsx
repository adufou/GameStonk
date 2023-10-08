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
import marketplacesApi from '@/http/api/marketplaces/marketplaces.api';
import MarketplaceModel from '@/models/marketplace.model';
import { optinalClassNames } from '@/tools/classNames';

interface MarketplaceCellProps {
    marketplace: MarketplaceModel;
}

const MarketplaceCell = ({ marketplace: propsMarketplace }: MarketplaceCellProps): React.ReactElement => {
    const [isAddWalletplaceModalOpen, setIsAddWalletModalOpen] = useState(false);
    const [isWalletListOpen, setIsWalletListOpen] = useState(false);

    const {
        data: getMarketplaceData,
        isSuccess: getMarketplaceIsSuccess,
    } = useQuery(['marketplaces', propsMarketplace.id], () => marketplacesApi.getMarketplace(propsMarketplace.id));
    
    function openAddMarketplaceModal(): void {
        setIsAddWalletModalOpen(true);
    }

    function closeAddMarketplaceModal(): void {
        setIsAddWalletModalOpen(false);
    }

    const handleToggleOpenMarketplaceList = (): void => {
        setIsWalletListOpen(!isWalletListOpen);
    };

    const transitionMarketplaceListClassName = useMemo(() => {
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

    if (getMarketplaceIsSuccess) {
        return (
            <div className='marketplace-cell'>
                <MarketplaceCard marketplace={getMarketplaceData?.body} />

                <Separator className='marketplace-cell__separator' />

                <div className='marketplace-cell__body'>
                    <div className='marketplace-cell__body__headers'>
                        <div className='marketplace-cell__body__headers__title'>
                            <Tooltip content={toggleOpenMarketplaceListTooltipContent}>
                                <ButtonXSmall onClick={handleToggleOpenMarketplaceList}>
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
                                <ButtonXSmall onClick={openAddMarketplaceModal}>
                                    <ConfigIcon>
                                        <MdAdd />
                                    </ConfigIcon>
                                </ButtonXSmall>
                            </Tooltip>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

    return (<></>);
};

export default MarketplaceCell;
