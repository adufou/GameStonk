import React, { useState } from 'react';
import Server from '../../models/Server';
import serverApi from '../../http/api/server/serverApi';
import { updateServer } from '../../stores/game/gamesReducer';
import store from '../../stores/globalStore';
import Modal from '../DesignSystem/Modal/Modal';


interface ServerEditModalProps {
    isOpen: boolean;
    closeModal: () => void;
    server: Server;
}

const ServerEditModal = ({ isOpen, closeModal, server }: ServerEditModalProps): React.ReactElement => {
    const [newServerName, setServerName] = useState(server.name);

    async function editServer(): Promise<void> {
        const updatedServer = {
            ...server,
            name: newServerName
        };

        const response = await serverApi.updateServer(updatedServer);
        if (response.status === 200) {
            store.dispatch(updateServer(response.body));
        }

        closeModal();
    }

    return (
        // <Modal isOpen={isOpen} onClose={closeModal}>
        <Modal>
            {/* <ModalHeader>Update {server.name}</ModalHeader>
            <ModalBody>
                <Label>
                    <span>Name</span>
                    <Input value={newServerName} onChange={e => setServerName(e.target.value)} />
                </Label>
            </ModalBody>
            <ModalFooter>
                <Button layout="outline" onClick={closeModal}>
                    Cancel
                </Button>
                <Button onClick={editServer}>Accept</Button>
            </ModalFooter> */}
        </Modal>
    );
};

export default ServerEditModal;
