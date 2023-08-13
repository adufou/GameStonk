import React from 'react';
import ReactChildren from '@/types/ReactChildren';

interface CardBodyProps {
    children: ReactChildren;
}

const CardBody = ({ children }: CardBodyProps): React.ReactElement => (
    <div className='card-body'>
        {children}
    </div>
);

export default CardBody;
