import ReactChildren from '@/types/ReactChildren';
import React from 'react';

interface CardProps {
    children: ReactChildren;
}

const Card = ({ children }: CardProps): React.ReactElement => (
    <div className='card'>
        {children}
    </div>
);

export default Card;
