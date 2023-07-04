import React, { useState } from 'react';
import { Card, CardBody } from '@windmill/react-ui';
import { Button } from '@windmill/react-ui';
import { MdEdit } from 'react-icons/md';
import ConfigIcon from '../Icon/ConfigIcon';
import { GrSubtract } from 'react-icons/gr';
import TwoCTAsModal from '../DesignSystem/Modal/TwoCTAsModal';
import { useServerApi } from '../../http/api/server/useServerApi';
import { useGlobalStore } from '../../stores/useGlobalStore';
import { deleteServer } from '../../stores/server/serverStoreActions';
import ServerEditModal from './ServerEditModal';

const ServerCard = ({ server }) => {
    const [isDeleteServerModalOpen, setIsDeleteServerModalOpen] = useState(false);
    const [isUpdateServerModalOpen, setIsUpdateServerModalOpen] = useState(false);

    const serverApi = useServerApi();
    const store = useGlobalStore();

    function acceptServerDeletion() {
        serverApi.deleteServer(server, (response) => {
            if (response.status === 204) {
                store.dispatch(deleteServer(server));
            }
        });
    }

    function openModalDeleteServer() {
        setIsDeleteServerModalOpen(true);
    }

    function closeModalDeleteServer() {
        setIsDeleteServerModalOpen(false);
    }

    function openModalUpdateServer() {
        setIsUpdateServerModalOpen(true);
    }

    function closeModalUpdateServer() {
        setIsUpdateServerModalOpen(false);
    }

    return (
        <Card>
            <CardBody className='flex place-content-between'>
                <span>
                    {server.name}
                </span>

                <div>
                    <Button size="small" layout="link" onClick={openModalUpdateServer}>
                        <ConfigIcon>
                            <MdEdit />
                        </ConfigIcon>
                    </Button>
                    <Button size="small" layout="link" onClick={openModalDeleteServer}>
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
