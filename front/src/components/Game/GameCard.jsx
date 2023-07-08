import React, { useState } from 'react';
import { Card, CardBody } from '@windmill/react-ui';
import { Button } from '@windmill/react-ui';
import { MdEdit } from 'react-icons/md';
import ConfigIcon from '../Icon/ConfigIcon';
import { GrSubtract } from 'react-icons/gr';
import { MdInventory } from 'react-icons/md';
import TwoCTAsModal from '../DesignSystem/Modal/TwoCTAsModal';
import { useGameApi } from '../../http/api/game/useGameApi';
import { useGlobalStore } from '../../stores/useGlobalStore';
import { deleteGame } from '../../stores/game/gameStoreActions';
import GameConfigModal from './GameConfigModal';

const GameCard = ({ game }) => {
    const [isDeleteGameModalOpen, setIsDeleteGameModalOpen] = useState(false);
    const [isConfigGameModalOpen, setIsConfigGameModalOpen] = useState(false);

    const gameApi = useGameApi();
    const store = useGlobalStore();

    function acceptGameDeletion() {
        gameApi.deleteGame(game, (response) => {
            if (response.status === 204) {
                store.dispatch(deleteGame(game));
            }
        });
    }

    function openModalDeleteGame() {
        setIsDeleteGameModalOpen(true);
    }

    function closeModalDeleteGame() {
        setIsDeleteGameModalOpen(false);
    }

    function openModalConfigGame() {
        setIsConfigGameModalOpen(true);
    }

    function closeModalConfigGame() {
        setIsConfigGameModalOpen(false);
    }

    return (
        <Card>
            <CardBody className='flex place-content-between'>
                <span>
                    {game.name}
                </span>

                <div>
                    <Button size="small" layout="link" onClick={openModalConfigGame}>
                        <ConfigIcon>
                            <MdInventory />
                        </ConfigIcon>
                    </Button>
                    <Button size="small" layout="link" onClick={openModalConfigGame}>
                        <ConfigIcon>
                            <MdEdit />
                        </ConfigIcon>
                    </Button>
                    <Button size="small" layout="link" onClick={openModalDeleteGame}>
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
