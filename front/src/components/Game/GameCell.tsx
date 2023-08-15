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
import GameCard from '@/components/Game/GameCard';
import ConfigIcon from '@/components/Icon/ConfigIcon';
import ServerAddModal from '@/components/Server/ServerAddModal';
import ServerCard from '@/components/Server/ServerCard';
import serversApi from '@/http/api/servers/serversApi';
import Game from '@/models/Game';
import { updateGame } from '@/stores/game/gamesReducer';
import store from '@/stores/globalStore';
import { optinalClassNames } from '@/tools/classNames';
import isCorrectStatusCodeOrNotModified from '@/tools/isCorrectStatusCodeOrNotModified';

interface GameCellProps {
    game: Game;
}

const GameCell = ({ game }: GameCellProps): React.ReactElement => {
    const [isAddServerModalOpen, setIsAddServerModalOpen] = useState(false);
    const [isServerListOpen, setIsServerListOpen] = useState(false);
    
    function openAddServerModal(): void {
        setIsAddServerModalOpen(true);
    }

    function closeAddServerModal(): void {
        setIsAddServerModalOpen(false);
    }

    const fetchServersFromGame = (): void => {
        serversApi.getServersFromGame(game)
            .then((response) => {
                if (isCorrectStatusCodeOrNotModified(response.status)) {
                    store.dispatch(updateGame({
                        ...game,
                        servers: response.body,
                    }));
                }
            })
            .catch(e => console.warn(e));
    };
    
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
    
    const toggleOpenServerListTooltipContent = useMemo(() => {
        return isServerListOpen ? 'Close server list' : 'Open server list';
    }, [isServerListOpen]);
    
    useEffect(() => {
        fetchServersFromGame();
    }, []);

    return (
        <div className='game-cell'>
            <GameCard game={game} />
            
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
                        {game.servers?.map(server => (
                            <ServerCard
                                key={'server-card-' + String(server.id)}
                                server={server}
                            />
                        ))}
                    </div>
                </div>
            </div>
    
            <ServerAddModal
                isOpen={isAddServerModalOpen}
                closeModal={closeAddServerModal}
                game={game}
            />
        </div>
    );
};

export default GameCell;
