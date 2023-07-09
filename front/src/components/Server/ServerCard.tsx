import React, { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import ConfigIcon from '../Icon/ConfigIcon';
import { GrSubtract } from 'react-icons/gr';
import TwoCTAsModal from '../DesignSystem/Modal/TwoCTAsModal';
import ServerEditModal from './ServerEditModal';
import Server from 'src/models/Server';
import store from 'src/stores/globalStore';
import { deleteServer } from 'src/stores/game/gamesReducer';
import serverApi from 'src/http/api/server/serverApi';
import Card from '../DesignSystem/Card/Card';
import CardBody from '../DesignSystem/Card/CardBody';
import Button from '../DesignSystem/Button/Button';

interface ServerCardProps {
    server: Server;
}

const ServerCard = ({ server }: ServerCardProps): React.ReactElement => {
    const [isDeleteServerModalOpen, setIsDeleteServerModalOpen] = useState(false);
    const [isUpdateServerModalOpen, setIsUpdateServerModalOpen] = useState(false);

    async function acceptServerDeletion(): Promise<void> {
        const response = await serverApi.deleteServer(server);
        if (response.status === 204) {
            store.dispatch(deleteServer(server));
        }
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

            <TwoCTAsModal isOpen={isDeleteServerModalOpen} onAccept={acceptServerDeletion} onClose={closeModalDeleteServer} />
            <ServerEditModal isOpen={isUpdateServerModalOpen} closeModal={closeModalUpdateServer} server={server} />
        </Card>
    );
};

export default ServerCard;
