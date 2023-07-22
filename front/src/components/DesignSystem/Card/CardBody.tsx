import React from 'react';
import ReactChildren from '../../../types/ReactChildren';
import './CardBody.scss';

interface CardBodyProps {
    children: ReactChildren;
}

const CardBody = ({ children }: CardBodyProps): React.ReactElement => {
    return (
        <div className='card-body'>
            {children}
        </div>
    );
};

export default CardBody;
