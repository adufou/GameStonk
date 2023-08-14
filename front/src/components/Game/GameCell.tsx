import React, {
    useEffect,
    useState,
} from 'react';
import { MdAdd } from 'react-icons/md';
import ButtonXSmall from '@/components/DesignSystem/Button/ButtonXSmall';
import Separator from '@/components/DesignSystem/Misc/Separator';
import GameCard from '@/components/Game/GameCard';
import ConfigIcon from '@/components/Icon/ConfigIcon';
import ServerAddModal from '@/components/Server/ServerAddModal';
import ServerCard from '@/components/Server/ServerCard';
import serversApi from '@/http/api/servers/serversApi';
import Game from '@/models/Game';
import { updateGame } from '@/stores/game/gamesReducer';
import store from '@/stores/globalStore';
import isCorrectStatusCodeOrNotModified from '@/tools/isCorrectStatusCodeOrNotModified';

interface GameCellProps {
    game: Game;
}

const GameCell = ({ game }: GameCellProps): React.ReactElement => {
    const [isAddServerModalOpen, setIsAddServerModalOpen] = useState(false);

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
    
    useEffect(() => {
        fetchServersFromGame();
    }, []);

    return (
        <div className='game-cell'>
            <GameCard game={game} />
            
            <Separator className='game-cell__separator' />

            <div className='game-cell__headers'>
                <span>
                    SERVERS
                </span>
                <div>
                    <ButtonXSmall onClick={openAddServerModal}>
                        <ConfigIcon>
                            <MdAdd />
                        </ConfigIcon>
                    </ButtonXSmall>
                </div>
            </div>
    
            <div className='game-cell__server-list'>
                {game.servers?.map(server => (
                    <ServerCard
                        key={'server-card-' + String(server.id)}
                        server={server}
                    />
                ))}
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
