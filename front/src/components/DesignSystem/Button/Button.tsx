import React from 'react';
import ReactChildren from '../../../types/ReactChildren';

interface ButtonProps {
    children: ReactChildren;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    href?: string;
    label?: string;
}

const Button = ({ children = [], type, onClick, href, label }: ButtonProps): React.ReactElement => {
    return (
        <div>
            {(label !== undefined) &&
                <span>{label}</span>
            }
            <button type={type} onClick={onClick}>
                {children}
            </button>
        </div>
    );
};

export default Button;
