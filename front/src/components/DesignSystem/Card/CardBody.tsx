import ReactChildren from '@/types/ReactChildren';
import React from 'react';

interface CardBodyProps {
    children: ReactChildren;
}

const CardBody = ({ children }: CardBodyProps): React.ReactElement => (
    <div className='card-body'>
        {children}
    </div>
);

export default CardBody;
