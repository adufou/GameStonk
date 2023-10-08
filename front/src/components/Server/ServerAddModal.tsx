import React, {
    ChangeEvent,
    useState,
} from 'react';
import {
    useMutation,
    useQueryClient,
} from 'react-query';
import Button from '@/components/DesignSystem/Button/Button';
import Input from '@/components/DesignSystem/Input/Input';
import Separator from '@/components/DesignSystem/Misc/Separator';
import Modal from '@/components/DesignSystem/Modal/Modal';
import ModalBody from '@/components/DesignSystem/Modal/ModalBody';
import ModalFooter from '@/components/DesignSystem/Modal/ModalFooter';
import ModalHeader from '@/components/DesignSystem/Modal/ModalHeader';
import serversApi from '@/http/api/servers/servers.api';
import GameModel from '@/models/game.model';
import ServerModel from '@/models/server.model';

interface ServerAddModalProps {
    isOpen: boolean;
    closeModal: () => void;
    game: GameModel;
}

const ServerAddModal = ({
    isOpen, closeModal, game, 
}: ServerAddModalProps): React.ReactElement => {
    const [newServerName, setServerName] = useState('');

    const queryClient = useQueryClient();
    
    const handleAddServerMutationSuccess = async (): Promise<void> => {
        await queryClient.invalidateQueries(['games', game.id, 'servers']);
        closeModal();
    };
    
    const addServerMutation = useMutation(
        (newServer: Partial<ServerModel>) => serversApi.addServer(newServer),
        { onSuccess: handleAddServerMutationSuccess },
    );
    
    const handleClickAddServerButton = (): void => {
        addServerMutation.mutate({
            game: game.id,
            name: newServerName,
        });
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
                    onClick={handleClickAddServerButton}
                >
                    <span>Accept</span>
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ServerAddModal;
