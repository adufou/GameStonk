import ReactChildren from '@/types/ReactChildren';
import React from 'react';

interface ModalFooterProps {
    children: ReactChildren;
}

const ModalFooter = ({ children = [] }: ModalFooterProps): React.ReactElement => (
    <div>
        {children}
    </div>
);

export default ModalFooter;
