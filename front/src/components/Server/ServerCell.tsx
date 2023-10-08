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
import MarketplaceAddModal from '@/components/Marketplace/MarketplaceAddModal';
import MarketplaceCell from '@/components/Marketplace/MarketplaceCell';
import ServerCard from '@/components/Server/ServerCard';
import marketplacesApi from '@/http/api/marketplaces/marketplaces.api';
import serversApi from '@/http/api/servers/servers.api';
import ServerModel from '@/models/server.model';
import { optinalClassNames } from '@/tools/classNames';

interface ServerCellProps {
    server: Pick<ServerModel, 'name' | 'id'>
}

const ServerCell = ({ server: propServer }: ServerCellProps): React.ReactElement => {
    const [isAddMarketplaceModalOpen, setIsAddMarketplaceModalOpen] = useState(false);
    const [isMarketplaceListOpen, setIsMarketplaceListOpen] = useState(false);
    
    const {
        data: getServerData,
        isSuccess: getServerIsSuccess,
    } = useQuery(['servers', propServer.id], () => serversApi.getServer(propServer.id));
    
    const {
        data: getMarketplacesFromServerData,
        isLoading: getMarketplacesFromServerIsLoading,
    } = useQuery(
        ['servers', propServer.id, 'marketplaces'],
        () => marketplacesApi.getMarketplacesFromServer(propServer.id),
    );
    
    function openAddMarketplaceModal(): void {
        setIsAddMarketplaceModalOpen(true);
    }

    function closeAddMarketplaceModal(): void {
        setIsAddMarketplaceModalOpen(false);
    }

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

    const marketplacesFromServer = useMemo(() => {
        if (!getMarketplacesFromServerIsLoading && getMarketplacesFromServerData) {
            return getMarketplacesFromServerData.body.map(marketplace => (
                <MarketplaceCell
                    key={'marketplace-cell' + String(marketplace.id)}
                    marketplace={marketplace}
                />
            ));
        }

        return (<></>);
    }, [getMarketplacesFromServerData]);
    
    const toggleOpenMarketplaceListTooltipContent = useMemo(() => {
        return isMarketplaceListOpen ? 'Close marketplace list' : 'Open marketplace list';
    }, [isMarketplaceListOpen]);
    
    if (getServerIsSuccess) {
        return (
            <div className='server-cell'>
                <ServerCard server={getServerData?.body} />

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
                            {marketplacesFromServer}
                        </div>
                    </div>
                </div>

                <MarketplaceAddModal
                    isOpen={isAddMarketplaceModalOpen}
                    closeModal={closeAddMarketplaceModal}
                    server={getServerData?.body}
                />
            </div>
        );
    }
    
    return (<></>);
};

export default ServerCell;
