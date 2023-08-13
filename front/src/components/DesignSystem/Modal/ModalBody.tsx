import React from 'react';
import ReactChildren from '@/types/ReactChildren';

interface ModalBodyProps {
    children: ReactChildren;
}

const ModalBody = ({ children = [] }: ModalBodyProps): React.ReactElement => (
    <div>
        {children}
    </div>
);

export default ModalBody;
