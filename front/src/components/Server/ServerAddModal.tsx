import React, {
    ChangeEvent,
    useState,
} from 'react';
import Button from '@/components/DesignSystem/Button/Button';
import Input from '@/components/DesignSystem/Input/Input';
import Modal from '@/components/DesignSystem/Modal/Modal';
import ModalBody from '@/components/DesignSystem/Modal/ModalBody';
import ModalFooter from '@/components/DesignSystem/Modal/ModalFooter';
import ModalHeader from '@/components/DesignSystem/Modal/ModalHeader';
import serversApi from '@/http/api/servers/serversApi';
import Game from '@/models/Game';
import { addServer } from '@/stores/game/gamesReducer';
import store from '@/stores/globalStore';

interface ServerAddModalProps {
    isOpen: boolean;
    closeModal: () => void;
    game: Game;
}

const ServerAddModal = ({
    isOpen, closeModal, game, 
}: ServerAddModalProps): React.ReactElement => {
    const [newServerName, setServerName] = useState('');

    const addNewServer = (): void => {
        const newServer = {
            game: game.id,
            name: newServerName,
        };

        serversApi.addServer(newServer)
            .then((response) => {
                if (response.status === 201) {
                    store.dispatch(addServer(response.body));
                }      
            })
            .catch(e => console.warn(e));

        closeModal();
    };
    
    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
        setServerName(e.target.value);
    };

    return (
        <Modal isOpen={isOpen}>
            <ModalHeader>
                <span>Add a Server</span>
            </ModalHeader>
            <ModalBody>
                <Input
                    label="name"
                    value={newServerName}
                    onChange={handleChangeInput}
                />
            </ModalBody>
            <ModalFooter>
                <Button onClick={closeModal}>
                    <span>Cancel</span>
                </Button>
                <Button onClick={addNewServer}>
                    <span>Accept</span>
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ServerAddModal;
