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

interface MarketplaceEditModalProps {
    isOpen: boolean;
    closeModal: () => void;
    marketplace: MarketplaceModel;
}

const MarketplaceEditModal = ({
    isOpen, closeModal, marketplace, 
}: MarketplaceEditModalProps): React.ReactElement => {
    const [newMarketplaceName, setMarketplaceName] = useState(marketplace.name);

    const queryClient = useQueryClient();
    
    const handleEditMarketplaceMutationSuccess = async (): Promise<void> => {
        await queryClient.invalidateQueries(['marketplaces', marketplace.id]);
        await queryClient.invalidateQueries(['servers']);
        closeModal();
    };

    const editMarketplaceMutation = useMutation(
        (updatedMarketplace: MarketplaceModel) => marketplacesApi.updateMarketplace(updatedMarketplace),
        { onSuccess: handleEditMarketplaceMutationSuccess },
    );

    const handleClickEditMarketplaceButton = (): void => {
        const updatedMarketplace = {
            ...marketplace,
            name: newMarketplaceName,
        };
        editMarketplaceMutation.mutate(updatedMarketplace);
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
                    onClick={handleClickEditMarketplaceButton}
                >
                    <span>Accept</span>
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default MarketplaceEditModal;
