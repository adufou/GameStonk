import ReactChildren from '@/types/ReactChildren';
import React from 'react';

interface ModalBodyProps {
    children: ReactChildren;
}

const ModalBody = ({ children = [] }: ModalBodyProps): React.ReactElement => (
    <div>
        {children}
    </div>
);

export default ModalBody;
