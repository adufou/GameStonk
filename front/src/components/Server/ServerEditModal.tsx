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
import ServerModel from '@/models/server.model';

interface ServerEditModalProps {
    isOpen: boolean;
    closeModal: () => void;
    server: ServerModel;
}

const ServerEditModal = ({
    isOpen, closeModal, server, 
}: ServerEditModalProps): React.ReactElement => {
    const [newServerName, setServerName] = useState(server.name);

    const queryClient = useQueryClient();
    
    const handleEditServerMutationSuccess = async (): Promise<void> => {
        await queryClient.invalidateQueries(['servers', server.id]);
        closeModal();
    };
    
    const editServerMutation = useMutation(
        (updatedServer: ServerModel) => serversApi.updateServer(updatedServer),
        { onSuccess: handleEditServerMutationSuccess },
    );
    
    const handleClickEditServerButton = (): void => {
        const updatedServer = {
            ...server,
            name: newServerName,
        };
        editServerMutation.mutate(updatedServer);
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
                    onClick={handleClickEditServerButton}
                >
                    <span>Accept</span>
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ServerEditModal;
