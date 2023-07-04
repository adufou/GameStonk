import React, { useState } from 'react';
import { Input, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui';
import { useServerApi } from '../../http/api/server/useServerApi';
import { useGlobalStore } from '../../stores/useGlobalStore';
import { updateServer } from '../../stores/server/serverStoreActions';

const ServerEditModal = ({ isOpen, closeModal, server }) => {
    const [newServerName, setServerName] = useState(server.name);

    const serverApi = useServerApi();
    const store = useGlobalStore();

    function editServer() {
        const updatedServer = {
            ...server,
            name: newServerName
        };

        serverApi.updateServer(updatedServer, (response) => {
            if (response.status === 200) {
                store.dispatch(updateServer(response.body));
            }

            closeModal();
        });
    }

    return (
        <Modal isOpen={isOpen} onClose={closeModal}>
            <ModalHeader>Update {server.name}</ModalHeader>
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
                <Button className="w-full sm:w-auto" onClick={editServer}>Accept</Button>
            </ModalFooter>
        </Modal>
    );
};

export default ServerEditModal;
