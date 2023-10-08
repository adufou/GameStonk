import React, { useState } from 'react';
import {
    MdEdit,
    MdRemove,
} from 'react-icons/md';
import {
    useMutation,
    useQueryClient,
} from 'react-query';
import ButtonXSmall from '@/components/DesignSystem/Button/ButtonXSmall';
import TwoCTAsModal from '@/components/DesignSystem/Modal/TwoCTAsModal';
import Tooltip from '@/components/DesignSystem/Tooltip/Tooltip';
import ConfigIcon from '@/components/Icon/ConfigIcon';
import ServerEditModal from '@/components/Server/ServerEditModal';
import serversApi from '@/http/api/servers/servers.api';
import ServerModel from '@/models/server.model';

interface ServerCardProps {
    server: ServerModel;
}

const ServerCard = ({ server }: ServerCardProps): React.ReactElement => {
    const [isDeleteServerModalOpen, setIsDeleteServerModalOpen] = useState(false);
    const [isUpdateServerModalOpen, setIsUpdateServerModalOpen] = useState(false);

    const queryClient = useQueryClient();
    
    const handleDeleteServerMutationSuccess = async (): Promise<void> => {
        await queryClient.invalidateQueries(['games']);
    };
    
    const deleteServerMutation = useMutation(
        () => serversApi.deleteServer(server),
        { onSuccess: handleDeleteServerMutationSuccess },
    );
    
    const handleClickDeleteServerButton = (): void => {
        deleteServerMutation.mutate();
    };

    function openModalDeleteServer(): void {
        setIsDeleteServerModalOpen(true);
    }

    function closeModalDeleteServer(): void {
        setIsDeleteServerModalOpen(false);
    }

    function openModalUpdateServer(): void {
        setIsUpdateServerModalOpen(true);
    }

    function closeModalUpdateServer(): void {
        setIsUpdateServerModalOpen(false);
    }

    return (
        <div className='server-card'>
            <span>
                {server.name}
            </span>

            <div className='server-card__buttons'>
                <Tooltip content="Edit server">
                    <ButtonXSmall onClick={openModalUpdateServer}>
                        <ConfigIcon>
                            <MdEdit />
                        </ConfigIcon>
                    </ButtonXSmall>
                </Tooltip>

                <Tooltip content="Delete server">
                    <ButtonXSmall onClick={openModalDeleteServer}>
                        <ConfigIcon>
                            <MdRemove />
                        </ConfigIcon>
                    </ButtonXSmall>
                </Tooltip>
            </div>

            <TwoCTAsModal 
                isOpen={isDeleteServerModalOpen}
                onAccept={handleClickDeleteServerButton}
                onClose={closeModalDeleteServer}
            /> 
            <ServerEditModal
                isOpen={isUpdateServerModalOpen}
                closeModal={closeModalUpdateServer}
                server={server}
            />
        </div>
    );
};

export default ServerCard;
