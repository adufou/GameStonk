import React from 'react';
import ReactChildren from '@/types/ReactChildren';

interface ModalFooterProps {
    children: ReactChildren;
}

const ModalFooter = ({ children = [] }: ModalFooterProps): React.ReactElement => (
    <div>
        {children}
    </div>
);

export default ModalFooter;
