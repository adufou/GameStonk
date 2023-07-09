import React from 'react';
import ReactChildren from 'src/types/ReactChildren';

interface CardProps {
    children: ReactChildren;
}

const Card = ({ children }: CardProps): React.ReactElement => {
    return (
        <div>
            {children}
        </div>
    );
};

export default Card;
