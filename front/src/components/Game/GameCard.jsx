import React, { useState } from 'react';
import { Card, CardBody } from '@windmill/react-ui'
import { Button } from '@windmill/react-ui'
import { MdEdit } from 'react-icons/md'
import ConfigIcon from "../Icon/ConfigIcon";
import { GrSubtract } from 'react-icons/gr'
import TwoCTAsModal from '../DesignSystem/Modal/TwoCTAsModal';
import { useGameApi } from '../../http/api/game/useGameApi';
import { useGameStore, useGlobalStore } from '../../stores/useGlobalStore';
import { deleteGame } from '../../stores/game/gameStoreActions';

const GameCard = ({ game }) => {
    const [isDeleteGameModalOpen, setIsDeleteGameModalOpen] = useState(false);

    const gameApi = useGameApi()
    const store = useGlobalStore()

    function acceptGameDeletion() {
        gameApi.deleteGame(game, (response) => {
            if (response.status === 204) {
                store.dispatch(deleteGame(game))
            }
        })
    }

    function openModalDeleteGame() {
        setIsDeleteGameModalOpen(true)
    }

    function closeModalDeleteGame() {
        setIsDeleteGameModalOpen(false)
    }

    return (
        <Card>
            <CardBody className='flex place-content-between'>
                <span>
                    { game.name }
                </span>
                
                <div>
                    <Button size="small" layout="link">
                        <ConfigIcon>
                            <MdEdit/>
                        </ConfigIcon>
                    </Button>
                    <Button size="small" layout="link" onClick={openModalDeleteGame}>
                        <ConfigIcon>
                            <GrSubtract />
                        </ConfigIcon>
                    </Button>                    
                </div>
            </CardBody>

            <TwoCTAsModal isOpen={isDeleteGameModalOpen} onAccept={acceptGameDeletion} onClose={closeModalDeleteGame}/>
        </Card>
    );
};

export default GameCard;
