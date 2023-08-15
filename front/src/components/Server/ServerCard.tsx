import { HttpStatusCode } from 'axios';
import React, { useState } from 'react';
import {
    MdEdit,
    MdOutlineAccountBalanceWallet,
    MdRemove,
} from 'react-icons/md';
import ButtonXSmall from '@/components/DesignSystem/Button/ButtonXSmall';
import TwoCTAsModal from '@/components/DesignSystem/Modal/TwoCTAsModal';
import Tooltip from '@/components/DesignSystem/Tooltip/Tooltip';
import ConfigIcon from '@/components/Icon/ConfigIcon';
import ServerEditModal from '@/components/Server/ServerEditModal';
import serversApi from '@/http/api/servers/serversApi';
import Server from '@/models/Server';
import { deleteServer } from '@/stores/game/gamesReducer';
import store from '@/stores/globalStore';
import isCorrectStatusCodeOrNotModified from '@/tools/isCorrectStatusCodeOrNotModified';

interface ServerCardProps {
    server: Server;
}

const ServerCard = ({ server }: ServerCardProps): React.ReactElement => {
    const [isDeleteServerModalOpen, setIsDeleteServerModalOpen] = useState(false);
    const [isUpdateServerModalOpen, setIsUpdateServerModalOpen] = useState(false);

    function acceptServerDeletion(): void {
        serversApi.deleteServer(server)
            .then((response) => {
                if (isCorrectStatusCodeOrNotModified(response.status, HttpStatusCode.NoContent)) {
                    store.dispatch(deleteServer(server));
                }
            })
            .catch(e => console.warn(e));
    }

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
                <Tooltip content="Go to wallet">
                    <ButtonXSmall onClick={openModalUpdateServer}>
                        <ConfigIcon>
                            <MdOutlineAccountBalanceWallet />
                        </ConfigIcon>
                    </ButtonXSmall>
                </Tooltip>
                <ButtonXSmall onClick={openModalUpdateServer}>
                    <ConfigIcon>
                        <MdEdit />
                    </ConfigIcon>
                </ButtonXSmall>
                <ButtonXSmall onClick={openModalDeleteServer}>
                    <ConfigIcon>
                        <MdRemove />
                    </ConfigIcon>
                </ButtonXSmall>
            </div>

            <TwoCTAsModal 
                isOpen={isDeleteServerModalOpen}
                onAccept={acceptServerDeletion}
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
