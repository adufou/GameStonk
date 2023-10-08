import React, {
    Fragment,
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
import GameCard from '@/components/Game/GameCard';
import ConfigIcon from '@/components/Icon/ConfigIcon';
import ServerAddModal from '@/components/Server/ServerAddModal';
import ServerCell from '@/components/Server/ServerCell';
import gamesApi from '@/http/api/games/games.api';
import serversApi from '@/http/api/servers/servers.api';
import GameModel from '@/models/game.model';
import { optinalClassNames } from '@/tools/classNames';

interface GameCellProps {
    game: Pick<GameModel, 'name' | 'id'>;
}

const GameCell = ({ game: propsGame }: GameCellProps): React.ReactElement => {
    const [isAddServerModalOpen, setIsAddServerModalOpen] = useState(false);
    const [isServerListOpen, setIsServerListOpen] = useState(false);

    const {
        data: getGameData,
        isSuccess: getGameIsSuccess, 
    } = useQuery(['games', propsGame.id], () => 
        gamesApi.getGame(propsGame.id),
    );

    const {
        data: getServersFromGameQueryData,
        isLoading: getServersFromGameQueryIsLoading,
    } = useQuery(
        ['games', propsGame.id, 'servers'], 
        () => serversApi.getServersFromGame(propsGame.id),
    );

    function openAddServerModal(): void {
        setIsAddServerModalOpen(true);
    }

    function closeAddServerModal(): void {
        setIsAddServerModalOpen(false);
    }
    
    const handleToggleOpenServerList = (): void => {
        setIsServerListOpen(!isServerListOpen);
    };
    
    const transitionServerListClassName = useMemo(() => {
        return optinalClassNames('game-cell__body__transition', [
            {
                class: 'game-cell__body__transition__open',
                condition: isServerListOpen,
            },
        ]);
    }, [isServerListOpen]);

    const transitionIconClassName = useMemo(() => {
        return optinalClassNames('game-cell__body__headers__icon', [
            {
                class: 'game-cell__body__headers__icon__rotated',
                condition: isServerListOpen,
            },
        ]);
    }, [isServerListOpen]);
    
    const serversFromGame = useMemo(() => {
        if (!getServersFromGameQueryIsLoading && getServersFromGameQueryData) {
            return getServersFromGameQueryData.body.map(server => (
                <ServerCell
                    key={'server-cell-' + String(server.id)}
                    server={server}
                />
            ));
        } 
        
        return (<></>);
    }, [getServersFromGameQueryData]);
    
    const toggleOpenServerListTooltipContent = useMemo(() => {
        return isServerListOpen ? 'Close server list' : 'Open server list';
    }, [isServerListOpen]);

    if (getGameIsSuccess) {
        return (
            <div className='game-cell'>
                <GameCard game={getGameData?.body} />
            
                <Separator className='game-cell__separator' />

                <div className='game-cell__body'>
                    <div className='game-cell__body__headers'>
                        <div className='game-cell__body__headers__title'>
                            <Tooltip content={toggleOpenServerListTooltipContent}>
                                <ButtonXSmall onClick={handleToggleOpenServerList}>
                                    <ConfigIcon>
                                        <MdChevronRight className={transitionIconClassName}/>
                                    </ConfigIcon>
                                </ButtonXSmall>
                            </Tooltip>
                            <span>
                        SERVERS
                            </span>
                        </div>
                        <div>
                            <Tooltip content='Add a server'>
                                <ButtonXSmall onClick={openAddServerModal}>
                                    <ConfigIcon>
                                        <MdAdd />
                                    </ConfigIcon>
                                </ButtonXSmall>
                            </Tooltip>
                        </div>
                    </div>

                    <div className={transitionServerListClassName}>
                        <div className='game-cell__body__server-list'>
                            { serversFromGame }
                        </div>
                    </div>
                </div>
    
                <ServerAddModal
                    isOpen={isAddServerModalOpen}
                    closeModal={closeAddServerModal}
                    game={getGameData?.body}
                />
            </div>
        );
    }
    
    return (<></>);
};

export default GameCell;
