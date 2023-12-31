import React from 'react';
import ReactChildren from '@/types/ReactChildren';

interface ModalHeaderProps {
    children: ReactChildren;
}

const ModalHeader = ({ children = [] }: ModalHeaderProps): React.ReactElement => (
    <div className='modal__header'>
        {children}
    </div>
);

export default ModalHeader;
