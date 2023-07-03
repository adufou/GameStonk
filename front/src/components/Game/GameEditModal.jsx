import React, { useEffect, useState } from 'react';
import { Input, Label, Button, TableContainer, Table, TableHeader, TableRow, TableCell, TableBody, Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import { useGameApi } from '../../http/api/game/useGameApi';
import { useGameStore, useGlobalStore } from '../../stores/useGlobalStore';
import { addGame, updateGame } from '../../stores/game/gameStoreActions';

const GameEditModal = ({isOpen, closeModal, game}) => {
    const [newGameName, setGameName] = useState(game.name);

    const gameApi = useGameApi()
    const store = useGlobalStore()

    function editGame() {
        const updatedGame = {
            ...game,
            name: newGameName
        }

        gameApi.updateGame(updatedGame, (response) => {
            if (response.status === 200) {
                console.log('dispatch')
                store.dispatch(updateGame(response.body))
            }
            
            closeModal()
        })
    }

    return (
        <Modal isOpen={isOpen} onClose={closeModal}>
                <ModalHeader>Update {game.name}</ModalHeader>
                <ModalBody>
                <Label>
                    <span>Name</span>
                    <Input className="mt-1" value={newGameName} onChange={e => setGameName(e.target.value)} />
                </Label>
                </ModalBody>
                <ModalFooter>
                    <Button className="w-full sm:w-auto" layout="outline" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button className="w-full sm:w-auto" onClick={editGame}>Accept</Button>
                </ModalFooter>
        </Modal>
    )
}

export default GameEditModal;