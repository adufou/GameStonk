import React, { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import ConfigIcon from '../Icon/ConfigIcon';
import { GrSubtract } from 'react-icons/gr';
import { MdInventory } from 'react-icons/md';
import TwoCTAsModal from '../DesignSystem/Modal/TwoCTAsModal';
import GameConfigModal from './GameConfigModal';
import Button from '../DesignSystem/Button/Button';
import Card from '../DesignSystem/Card/Card';
import CardBody from '../DesignSystem/Card/CardBody';
import gamesApi from '../../http/api/games/gamesApi';
import { deleteGame } from '../../stores/game/gamesReducer';
import store from '../../stores/globalStore';
import Game from '../../models/Game';

interface GameCardProps {
    game: Game;
}

const GameCard = ({ game }: GameCardProps): React.ReactElement => {
    const [isDeleteGameModalOpen, setIsDeleteGameModalOpen] = useState(false);
    const [isConfigGameModalOpen, setIsConfigGameModalOpen] = useState(false);

    async function acceptGameDeletion(): Promise<void> {
        const response = await gamesApi.deleteGame(game);

        if (response.status === 200) {
            store.dispatch(deleteGame(game));
        }
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

            <TwoCTAsModal isOpen={isDeleteGameModalOpen} onAccept={acceptGameDeletion} onClose={closeModalDeleteGame} />
            <GameConfigModal isOpen={isConfigGameModalOpen} closeModal={closeModalConfigGame} game={game} />
        </Card>
    );
};

export default GameCard;
