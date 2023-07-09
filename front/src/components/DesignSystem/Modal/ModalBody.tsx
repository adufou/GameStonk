import React from 'react';
import ReactChildren from 'src/types/ReactChildren';

interface ModalBodyProps {
    children: ReactChildren;
}

const ModalBody = ({ children = [] }: ModalBodyProps): React.ReactElement => {
    return (
        <div>
            {children}
        </div>
    );
};

export default ModalBody;
