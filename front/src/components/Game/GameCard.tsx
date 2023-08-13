import React, { useState } from 'react';
import { GrSubtract } from 'react-icons/gr';
import { MdEdit } from 'react-icons/md';
import { MdInventory } from 'react-icons/md';
import Button from '@/components/DesignSystem/Button/Button';
import Card from '@/components/DesignSystem/Card/Card';
import CardBody from '@/components/DesignSystem/Card/CardBody';
import TwoCTAsModal from '@/components/DesignSystem/Modal/TwoCTAsModal';
import GameConfigModal from '@/components/Game/GameConfigModal';
import ConfigIcon from '@/components/Icon/ConfigIcon';
import gamesApi from '@/http/api/games/gamesApi';
import Game from '@/models/Game';
import { deleteGame } from '@/stores/game/gamesReducer';
import store from '@/stores/globalStore';
interface GameCardProps {
    game: Game;
}

const GameCard = ({ game }: GameCardProps): React.ReactElement => {
    const [isDeleteGameModalOpen, setIsDeleteGameModalOpen] = useState(false);
    const [isConfigGameModalOpen, setIsConfigGameModalOpen] = useState(false);

    function acceptGameDeletion(): void {
        gamesApi.deleteGame(game)
            .then((response) => {
                if (response.status === 200) {
                    store.dispatch(deleteGame(game));
                }
            })
            .catch(e => console.warn(e));
    }

    function openModalDeleteGame(): void {
        setIsDeleteGameModalOpen(true);
    }

    function closeModalDeleteGame(): void {
        setIsDeleteGameModalOpen(false);
    }

    function openModalConfigGame(): void {
        setIsConfigGameModalOpen(true);
    }

    function closeModalConfigGame(): void {
        setIsConfigGameModalOpen(false);
    }

    return (
        <Card>
            <CardBody>
                <span>
                    {game.name}
                </span>

                <div>
                    <Button onClick={openModalConfigGame}>
                        <ConfigIcon>
                            <MdInventory />
                        </ConfigIcon>
                    </Button>
                    <Button onClick={openModalConfigGame}>
                        <ConfigIcon>
                            <MdEdit />
                        </ConfigIcon>
                    </Button>
                    <Button onClick={openModalDeleteGame}>
                        <ConfigIcon>
                            <GrSubtract />
                        </ConfigIcon>
                    </Button>
                </div>
            </CardBody>

            <TwoCTAsModal
                isOpen={isDeleteGameModalOpen}
                onAccept={acceptGameDeletion}
                onClose={closeModalDeleteGame}
            />
            <GameConfigModal
                isOpen={isConfigGameModalOpen}
                closeModal={closeModalConfigGame}
                game={game}
            />
        </Card>
    );
};

export default GameCard;
