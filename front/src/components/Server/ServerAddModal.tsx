import React, { useState } from 'react';
import { Input, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui';
import { useServerApi } from '../../http/api/server/useServerApi';
import { useGlobalStore } from '../../stores/useGlobalStore';
import { addServer } from '../../stores/server/serverStoreActions';

const ServerAddModal = ({ isOpen, closeModal, game }) => {
    const [newServerName, setServerName] = useState('');

    const serverApi = useServerApi();
    const store = useGlobalStore();

    function addNewServer() {
        const newServer = {
            game: game.id,
            name: newServerName,
        };

        serverApi.addServer(newServer, (response) => {
            if (response.status === 201) {
                store.dispatch(addServer(response.body));
            }

            closeModal();
        });
    }

    return (
        <Modal isOpen={isOpen} onClose={closeModal}>
            <ModalHeader>Add a server</ModalHeader>
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
            </ModalFooter>
        </Modal>
    );
};

export default ServerAddModal;
