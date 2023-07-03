import React, { useEffect, useState } from 'react';
import { Input, Label, Button, TableContainer, Table, TableHeader, TableRow, TableCell, TableBody, Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import { useServerApi } from '../../http/api/server/useServerApi';
import { useServerStore } from '../../stores/server/useServerStore';
import { addServer } from '../../stores/server/serverStoreActions';

const ServerAddModal = ({isAddServerModalOpen, closeAddServerModal}) => {
    const [newServerName, setServerName] = useState('');

    const serverApi = useServerApi()
    const serverStore = useServerStore()

    function addNewServer() {
        const newServer = {
            name: newServerName
        }

        serverApi.addServer(newServer, (response) => {
            if (response.status === 201) {
                serverStore.dispatch(addServer(response.body))
            }
            
            closeAddServerModal()
        })
    }

    return (
        <Modal isOpen={isAddServerModalOpen} onClose={closeAddServerModal}>
                <ModalHeader>Add a server</ModalHeader>
                <ModalBody>
                <Label>
                    <span>Name</span>
                    <Input className="mt-1" value={newServerName} onChange={e => setServerName(e.target.value)} />
                </Label>
                </ModalBody>
                <ModalFooter>
                    <Button className="w-full sm:w-auto" layout="outline" onClick={closeAddServerModal}>
                        Cancel
                    </Button>
                    <Button className="w-full sm:w-auto" onClick={addNewServer}>Accept</Button>
                </ModalFooter>
        </Modal>
    )
}

export default ServerAddModal;