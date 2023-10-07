import React, {
    useMemo,
    useState,
} from 'react';
import {
    MdAdd,
    MdChevronRight,
} from 'react-icons/md';
import ButtonXSmall from '@/components/DesignSystem/Button/ButtonXSmall';
import Separator from '@/components/DesignSystem/Misc/Separator';
import Tooltip from '@/components/DesignSystem/Tooltip/Tooltip';
import ConfigIcon from '@/components/Icon/ConfigIcon';
import MarketplaceCard from '@/components/Marketplace/MarketplaceCard';
import MarketplaceModel from '@/models/marketplace.model';
import { optinalClassNames } from '@/tools/classNames';

interface MarketplaceCellProps {
    marketplace: MarketplaceModel;
}

const MarketplaceCell = ({ marketplace }: MarketplaceCellProps): React.ReactElement => {
    const [isAddWalletplaceModalOpen, setIsAddWalletModalOpen] = useState(false);
    const [isWalletListOpen, setIsWalletListOpen] = useState(false);

    function openAddMarketplaceModal(): void {
        setIsAddWalletModalOpen(true);
    }

    function closeAddMarketplaceModal(): void {
        setIsAddWalletModalOpen(false);
    }

    // TODO: FETCH LES WALLETS
    // const fetchMarketplacesFromMarketplace = (): void => {
    //     marketplacesApi.getMarketplacesFromMarketplace(marketplace)
    //         .then((response) => {
    //             if (isCorrectStatusCodeOrNotModified(response.status)) {
    //                 store.dispatch(updateMarketplace({
    //                     ...marketplace,
    //                     marketplaces: response.body,
    //                 }));
    //             }
    //         })
    //         .catch(e => console.warn(e));
    // };

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
        return isWalletListOpen ? 'Close marketplace list' : 'Open marketplace list';
    }, [isWalletListOpen]);

    // TODO: fetch les wallets
    // useEffect(() => {
    //     fetchMarketplacesFromMarketplace();
    // }, []);

    return (
        <div className='marketplace-cell'>
            <MarketplaceCard marketplace={marketplace} />

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
                        MARKETPLACES
                        </span>
                    </div>
                    <div>
                        <Tooltip content='Add a marketplace'>
                            <ButtonXSmall onClick={openAddMarketplaceModal}>
                                <ConfigIcon>
                                    <MdAdd />
                                </ConfigIcon>
                            </ButtonXSmall>
                        </Tooltip>
                    </div>
                </div>

                {/*<div className={transitionMarketplaceListClassName}>*/}
                {/*    <div className='marketplace-cell__body__wallet-list'>*/}
                {/*        {marketplace.wallets?.map(marketplace => (*/}
                {/*            <MarketplaceCard*/}
                {/*                key={'marketplace-card-' + String(marketplace.id)}*/}
                {/*                marketplace={marketplace}*/}
                {/*            />*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>

            {/*<WalletAddModal*/}
            {/*    isOpen={isAddWalletplaceModalOpen}*/}
            {/*    closeModal={closeAddMarketplaceModal}*/}
            {/*    marketplace={marketplace}*/}
            {/*/>*/}
        </div>
    );
};

export default MarketplaceCell;
