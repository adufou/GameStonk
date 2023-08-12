import ReactChildren from '@/types/ReactChildren';
import React from 'react';

interface ModalHeaderProps {
    children: ReactChildren;
}

const ModalHeader = ({ children = [] }: ModalHeaderProps): React.ReactElement => (
    <div>
        {children}
    </div>
);

export default ModalHeader;
