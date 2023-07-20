import React from 'react';
import ReactChildren from '../../../types/ReactChildren';
import './Button.scss'

interface ButtonProps {
    children: ReactChildren;
    onClick?: () => void;
    href?: string;
    label?: string;
}

const Button = ({ children = [], onClick, href, label }: ButtonProps): React.ReactElement => {
    return (
        <div className='button'>
            {(label !== undefined) &&
                <span className='button__label'>{label}</span>
            }
            <div className='button__button' onClick={onClick}>
                {children}
            </div>
        </div>
    );
};

export default Button;
