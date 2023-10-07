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
import MarketplaceModel from '@/models/marketplace.model';
import { updateMarketplace } from '@/stores/game/gamesReducer';
import store from '@/stores/globalStore';
import isCorrectStatusCodeOrNotModified from '@/tools/isCorrectStatusCodeOrNotModified';

interface MarketplaceEditModalProps {
    isOpen: boolean;
    closeModal: () => void;
    marketplace: MarketplaceModel;
}

const MarketplaceEditModal = ({
    isOpen, closeModal, marketplace, 
}: MarketplaceEditModalProps): React.ReactElement => {
    const [newMarketplaceName, setMarketplaceName] = useState(marketplace.name);

    const editMarketplace = (): void => {
        const updatedMarketplace = {
            ...marketplace,
            name: newMarketplaceName,
        };

        marketplacesApi.updateMarketplace(updatedMarketplace)
            .then((response) => { 
                if (isCorrectStatusCodeOrNotModified(response.status)) {
                    store.dispatch(updateMarketplace(response.body)); 
                }
            })
            .catch(e => console.warn(e));

        closeModal();
    };
    
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setMarketplaceName(e.target.value);
    };
    
    return (
        <Modal
            isOpen={isOpen}
            onClose={closeModal}
        >
            <ModalHeader>
                <span>Update {marketplace.name}</span>
            </ModalHeader>
            
            <Separator />
            
            <ModalBody>
                <Input
                    label="Name"
                    value={newMarketplaceName}
                    onChange={handleInputChange}
                />
            </ModalBody>
            
            <Separator />
            
            <ModalFooter>
                <Button
                    className='marketplace-edit-modal__footer-button'
                    onClick={closeModal}
                >
                    <span>Cancel</span>
                </Button>
                <Button
                    className='marketplace-edit-modal__footer-button'
                    onClick={editMarketplace}
                >
                    <span>Accept</span>
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default MarketplaceEditModal;
