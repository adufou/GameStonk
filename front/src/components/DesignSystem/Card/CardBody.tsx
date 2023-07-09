import React from 'react';
import ReactChildren from 'src/types/ReactChildren';

interface CardBodyProps {
    children: ReactChildren;
}

const CardBody = ({ children }: CardBodyProps): React.ReactElement => {
    return (
        <div>
            {children}
        </div>
    );
};

export default CardBody;
