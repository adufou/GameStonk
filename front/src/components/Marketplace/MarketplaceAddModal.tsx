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
import marketplacesApi from '@/http/api/marketplaces/marketplaces.api';
import MarketplaceModel from '@/models/marketplace.model';
import ServerModel from '@/models/server.model';

interface MarketplaceAddModalProps {
    isOpen: boolean;
    closeModal: () => void;
    server: ServerModel;
}

const MarketplaceAddModal = ({
    isOpen, closeModal, server, 
}: MarketplaceAddModalProps): React.ReactElement => {
    const [newMarketplaceName, setMarketplaceName] = useState('');

    const queryClient = useQueryClient();
    
    const handleAddMarketplaceMutationSuccess = async (): Promise<void> => {
        await queryClient.invalidateQueries(['servers', server.id, 'marketplaces']);
        closeModal();
    };
    
    const addMarketplaceMutation = useMutation(
        (newMarketplace: Partial<MarketplaceModel>) => marketplacesApi.addMarketplace(newMarketplace),
        { onSuccess: handleAddMarketplaceMutationSuccess },
    );
    
    const handleClickAddMarketplaceButton = (): void => {
        addMarketplaceMutation.mutate({
            server: server.id,
            name: newMarketplaceName,
        });
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
                    onClick={handleClickAddMarketplaceButton}
                >
                    <span>Accept</span>
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default MarketplaceAddModal;
