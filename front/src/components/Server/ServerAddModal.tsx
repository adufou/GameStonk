import React, { useState } from 'react';

import Modal from '../DesignSystem/Modal/Modal';
import Game from '../../models/Game';
import serverApi from '../../http/api/server/serverApi';
import { addServer } from '../../stores/game/gamesReducer';
import store from '../../stores/globalStore';

interface ServerAddModalProps {
    isOpen: boolean;
    closeModal: () => void;
    game: Game;
}

const ServerAddModal = ({ isOpen, closeModal, game }: ServerAddModalProps): React.ReactElement => {
    const [newServerName, setServerName] = useState('');

    async function addNewServer(): Promise<void> {
        const newServer = {
            game: game.id,
            name: newServerName,
        };

        const response = await serverApi.addServer(newServer);
        if (response.status === 201) {
            store.dispatch(addServer(response.body));
        }

        closeModal();
    }

    return (
        // <Modal isOpen={isOpen} onClose={closeModal}>
        <Modal >
            {/* <ModalHeader>Add a server</ModalHeader>
            <ModalBody>
                <Label>
                    <span>Name</span>
                    <Input className="mt-1" value={newServerName} onChange={e => setServerName(e.target.value)} />
                </Label>
            </ModalBody>
            <ModalFooter>
                <Button className="w-full sm:w-auto" layout="outline" onClick={closeModal}>
                    Cancel
                </Button>
                <Button className="w-full sm:w-auto" onClick={addNewServer}>Accept</Button>
            </ModalFooter> */}
        </Modal>
    );
};

export default ServerAddModal;
