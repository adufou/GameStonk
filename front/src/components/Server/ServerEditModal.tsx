import React, {
    ChangeEvent,
    useState,
} from 'react';
import Button from '@/components/DesignSystem/Button/Button';
import Input from '@/components/DesignSystem/Input/Input';
import Separator from '@/components/DesignSystem/Misc/Separator';
import Modal from '@/components/DesignSystem/Modal/Modal';
import ModalBody from '@/components/DesignSystem/Modal/ModalBody';
import ModalFooter from '@/components/DesignSystem/Modal/ModalFooter';
import ModalHeader from '@/components/DesignSystem/Modal/ModalHeader';
import serversApi from '@/http/api/servers/serversApi';
import Server from '@/models/Server';
import { updateServer } from '@/stores/game/gamesReducer';
import store from '@/stores/globalStore';
import isCorrectStatusCodeOrNotModified from '@/tools/isCorrectStatusCodeOrNotModified';

interface ServerEditModalProps {
    isOpen: boolean;
    closeModal: () => void;
    server: Server;
}

const ServerEditModal = ({
    isOpen, closeModal, server, 
}: ServerEditModalProps): React.ReactElement => {
    const [newServerName, setServerName] = useState(server.name);

    const editServer = (): void => {
        const updatedServer = {
            ...server,
            name: newServerName,
        };

        serversApi.updateServer(updatedServer)
            .then((response) => { 
                if (isCorrectStatusCodeOrNotModified(response.status)) {
                    store.dispatch(updateServer(response.body)); 
                }
            })
            .catch(e => console.warn(e));

        closeModal();
    };
    
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setServerName(e.target.value);
    };
    
    return (
        <Modal
            isOpen={isOpen}
            onClose={closeModal}
        >
            <ModalHeader>
                <span>Update {server.name}</span>
            </ModalHeader>
            
            <Separator />
            
            <ModalBody>
                <Input
                    label="Name"
                    value={newServerName}
                    onChange={handleInputChange}
                />
            </ModalBody>
            
            <Separator />
            
            <ModalFooter>
                <Button
                    className='server-edit-modal__footer-button'
                    onClick={closeModal}
                >
                    <span>Cancel</span>
                </Button>
                <Button
                    className='server-edit-modal__footer-button'
                    onClick={editServer}
                >
                    <span>Accept</span>
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ServerEditModal;
