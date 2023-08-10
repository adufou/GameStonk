import React, { useState } from 'react';
import Server from '../../models/Server';
import serversApi from '../../http/api/servers/serversApi';
import { updateServer } from '../../stores/game/gamesReducer';
import store from '../../stores/globalStore';
import Modal from '../DesignSystem/Modal/Modal';
import Button from '../DesignSystem/Button/Button';
import Input from '../DesignSystem/Input/Input';
import ModalBody from '../DesignSystem/Modal/ModalBody';
import ModalHeader from '../DesignSystem/Modal/ModalHeader';
import ModalFooter from '../DesignSystem/Modal/ModalFooter';


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

        const response = await serversApi.updateServer(updatedServer);
        if (response.status === 200) {
            store.dispatch(updateServer(response.body));
        }

        closeModal();
    }

    return (
        <Modal isOpen={isOpen}>
            <ModalHeader>
                <span>Update {server.name}</span>
            </ModalHeader>
            <ModalBody>
                <Input
                    label="Name"
                    value={newServerName}
                    onChange={e => setServerName(e.target.value)}
                />
            </ModalBody>
            <ModalFooter>
                <Button onClick={closeModal}>
                    <span>Cancel</span>
                </Button>
                <Button onClick={editServer}>
                    <span>Accept</span>
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ServerEditModal;
