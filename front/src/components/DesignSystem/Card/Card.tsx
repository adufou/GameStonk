import React from 'react';
import ReactChildren from '../../../types/ReactChildren';
import './Card.scss';

interface CardProps {
    children: ReactChildren;
}

const Card = ({ children }: CardProps): React.ReactElement => {
    return (
        <div className='card'>
            {children}
        </div>
    );
};

export default Card;
