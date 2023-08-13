import { HttpStatusCode } from 'axios';
import React, { useState } from 'react';
import { GrSubtract } from 'react-icons/gr';
import { MdEdit } from 'react-icons/md';
import Button from '@/components/DesignSystem/Button/Button';
import Card from '@/components/DesignSystem/Card/Card';
import CardBody from '@/components/DesignSystem/Card/CardBody';
import TwoCTAsModal from '@/components/DesignSystem/Modal/TwoCTAsModal';
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
        <Card>
            <CardBody>
                <span>
                    {server.name}
                </span>

                <div>
                    <Button onClick={openModalUpdateServer}>
                        <ConfigIcon>
                            <MdEdit />
                        </ConfigIcon>
                    </Button>
                    <Button onClick={openModalDeleteServer}>
                        <ConfigIcon>
                            <GrSubtract />
                        </ConfigIcon>
                    </Button>
                </div>
            </CardBody>
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
        </Card>
    );
};

export default ServerCard;
