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
import marketplacesApi from '@/http/api/marketplaces/marketplaces.api';
import ServerModel from '@/models/server.model';
import { addMarketplace } from '@/stores/game/gamesReducer';
import store from '@/stores/globalStore';
import isCorrectStatusCodeOrNotModified from '@/tools/isCorrectStatusCodeOrNotModified';

interface MarketplaceAddModalProps {
    isOpen: boolean;
    closeModal: () => void;
    server: ServerModel;
}

const MarketplaceAddModal = ({
    isOpen, closeModal, server, 
}: MarketplaceAddModalProps): React.ReactElement => {
    const [newMarketplaceName, setMarketplaceName] = useState('');

    const addNewMarketplace = (): void => {
        const newMarketplace = {
            server: server.id,
            name: newMarketplaceName,
        };

        marketplacesApi.addMarketplace(newMarketplace)
            .then((response) => {
                if (isCorrectStatusCodeOrNotModified(response.status, HttpStatusCode.Created)) {
                    store.dispatch(addMarketplace(response.body));
                }      
            })
            .catch(e => console.warn(e));

        closeModal();
    };
    
    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
        setMarketplaceName(e.target.value);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={closeModal}
        >
            <ModalHeader>
                <span>Add a Marketplace</span>
            </ModalHeader>
            
            <Separator />
            
            <ModalBody>
                <Input
                    label="name"
                    value={newMarketplaceName}
                    onChange={handleChangeInput}
                />
            </ModalBody>

            <Separator />
            
            <ModalFooter>
                <Button
                    className='marketplace-add-modal__footer-button'
                    onClick={closeModal}
                >
                    <span>Cancel</span>
                </Button>
                <Button
                    className='marketplace-add-modal__footer-button'
                    onClick={addNewMarketplace}
                >
                    <span>Accept</span>
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default MarketplaceAddModal;
