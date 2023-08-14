import * as React from 'react';
import * as ReactModal from 'react-modal';
import ReactChildren from '@/types/ReactChildren';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactChildren;
}
const Modal = ({
    isOpen, onClose, children, 
}: ModalProps): React.ReactElement => {
    const handleCloseModal = (): void => {
        onClose();
    };
    
    const modalAppElement = (): HTMLElement => {
        const app = document.getElementsByClassName('App')?.[ 0 ];
        if (!app) {
            return document.body;
        }
        
        let modalsRoot = document.getElementById('modals-root');
        if (!modalsRoot) {
            modalsRoot = document.createElement('div');
            modalsRoot.id = 'modals-root';
            app.appendChild(modalsRoot);
        }
        
        return modalsRoot;
    };
    
    return (
        <ReactModal 
            appElement={document.body}
            parentSelector={modalAppElement}
            isOpen={isOpen}
            onRequestClose={handleCloseModal}
            className='modal'
            overlayClassName='modal__overlay'
        >
            {children}
        </ReactModal>
    ); };

export default Modal;
