import ReactChildren from '@/types/ReactChildren';
import * as React from 'react';
import * as ReactModal from 'react-modal';

interface ModalProps {
    isOpen: boolean;
    children: ReactChildren;
}
const Modal = ({
    isOpen, children, 
}: ModalProps): React.ReactElement => (
    <ReactModal 
        appElement={document.body}
        isOpen={isOpen}
    >
        {children}
    </ReactModal>
);

export default Modal;
