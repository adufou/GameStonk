import { HttpStatusCode } from 'axios';
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
import Game from '@/models/Game';
import { addServer } from '@/stores/game/gamesReducer';
import store from '@/stores/globalStore';
import isCorrectStatusCodeOrNotModified from '@/tools/isCorrectStatusCodeOrNotModified';

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
                if (isCorrectStatusCodeOrNotModified(response.status, HttpStatusCode.Created)) {
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
        <Modal
            isOpen={isOpen}
            onClose={closeModal}
        >
            <ModalHeader>
                <span>Add a Server</span>
            </ModalHeader>
            
            <Separator />
            
            <ModalBody>
                <Input
                    label="name"
                    value={newServerName}
                    onChange={handleChangeInput}
                />
            </ModalBody>

            <Separator />
            
            <ModalFooter>
                <Button
                    className='server-add-modal__footer-button'
                    onClick={closeModal}
                >
                    <span>Cancel</span>
                </Button>
                <Button
                    className='server-add-modal__footer-button'
                    onClick={addNewServer}
                >
                    <span>Accept</span>
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ServerAddModal;
