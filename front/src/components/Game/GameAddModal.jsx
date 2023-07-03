import React, { useEffect, useState } from 'react';
import { Input, Label, Button, TableContainer, Table, TableHeader, TableRow, TableCell, TableBody, Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import { useGameApi } from '../../http/api/game/useGameApi';
import { useGameStore } from '../../stores/game/useGameStore';
import { addGame } from '../../stores/game/gameActions';

const GameAddModal = ({isAddGameModalOpen, closeAddGameModal}) => {
    const [newGameName, setGameName] = useState('');

    const gameApi = useGameApi()
    const gameStore = useGameStore()

    function addNewGame() {
        gameApi.addGame(newGameName, (response) => {
            console.log(response)
            if (response.status === 201) {
                gameStore.dispatch(addGame(response.body.name))
            }
            
            closeAddGameModal()
        })
    }

    return (
        <Modal isOpen={isAddGameModalOpen} onClose={closeAddGameModal}>
                <ModalHeader>Add a game</ModalHeader>
                <ModalBody>
                <Label>
                    <span>Name</span>
                    <Input className="mt-1" value={newGameName} onChange={e => setGameName(e.target.value)} />
                </Label>
                </ModalBody>
                <ModalFooter>
                    <Button className="w-full sm:w-auto" layout="outline" onClick={closeAddGameModal}>
                        Cancel
                    </Button>
                    <Button className="w-full sm:w-auto" onClick={addNewGame}>Accept</Button>
                </ModalFooter>
        </Modal>
    )
}

export default GameAddModal;