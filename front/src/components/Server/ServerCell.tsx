import React, {
    useEffect,
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
import MarketplaceAddModal from '@/components/Marketplace/MarketplaceAddModal';
import MarketplaceCard from '@/components/Marketplace/MarketplaceCard';
import ServerCard from '@/components/Server/ServerCard';
import marketplacesApi from '@/http/api/marketplaces/marketplaces.api';
import ServerModel from '@/models/server.model';
import { addMarketplace } from '@/stores/game/gamesReducer';
import store from '@/stores/globalStore';
import { optinalClassNames } from '@/tools/classNames';
import isCorrectStatusCodeOrNotModified from '@/tools/isCorrectStatusCodeOrNotModified';

interface ServerCellProps {
    server: ServerModel;
}

const ServerCell = ({ server }: ServerCellProps): React.ReactElement => {
    const [isAddMarketplaceModalOpen, setIsAddMarketplaceModalOpen] = useState(false);
    const [isMarketplaceListOpen, setIsMarketplaceListOpen] = useState(false);

    function openAddMarketplaceModal(): void {
        setIsAddMarketplaceModalOpen(true);
    }

    function closeAddMarketplaceModal(): void {
        setIsAddMarketplaceModalOpen(false);
    }

    const fetchMarketplacesFromServer = (): void => {
        marketplacesApi.getMarketplacesFromServer(server)
            .then((response) => {
                if (isCorrectStatusCodeOrNotModified(response.status)) {
                    response.body.forEach((marketplace) => {
                        console.log(marketplace);
                        store.dispatch(addMarketplace(marketplace));
                    },
                    ); }
            })
            .catch(e => console.warn(e));
    };

    const handleToggleOpenMarketplaceList = (): void => {
        setIsMarketplaceListOpen(!isMarketplaceListOpen);
    };

    const transitionMarketplaceListClassName = useMemo(() => {
        return optinalClassNames('server-cell__body__transition', [
            {
                class: 'server-cell__body__transition__open',
                condition: isMarketplaceListOpen,
            },
        ]);
    }, [isMarketplaceListOpen]);

    const transitionIconClassName = useMemo(() => {
        return optinalClassNames('server-cell__body__headers__icon', [
            {
                class: 'server-cell__body__headers__icon__rotated',
                condition: isMarketplaceListOpen,
            },
        ]);
    }, [isMarketplaceListOpen]);

    const toggleOpenMarketplaceListTooltipContent = useMemo(() => {
        return isMarketplaceListOpen ? 'Close marketplace list' : 'Open marketplace list';
    }, [isMarketplaceListOpen]);

    useEffect(() => {
        fetchMarketplacesFromServer();
    }, []);

    return (
        <div className='server-cell'>
            <ServerCard server={server} />

            <Separator className='server-cell__separator' />

            <div className='server-cell__body'>
                <div className='server-cell__body__headers'>
                    <div className='server-cell__body__headers__title'>
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

                <div className={transitionMarketplaceListClassName}>
                    <div className='server-cell__body__marketplace-list'>
                        {server.marketplaces?.map(marketplace => (
                            <MarketplaceCard
                                key={'marketplace-card-' + String(marketplace.id)}
                                marketplace={marketplace}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <MarketplaceAddModal
                isOpen={isAddMarketplaceModalOpen}
                closeModal={closeAddMarketplaceModal}
                server={server}
            />
        </div>
    );
};

export default ServerCell;
