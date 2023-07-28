import * as React from 'react';
import ReactChildren from '../../../types/ReactChildren';
import * as ReactModal from 'react-modal';

interface ModalProps {
    isOpen: boolean;
    children: ReactChildren;
}

const Modal = ({ isOpen, children }: ModalProps): React.ReactElement => {
    return (
        <ReactModal isOpen={isOpen}>
            {children}
        </ReactModal>
    );
};

export default Modal;
