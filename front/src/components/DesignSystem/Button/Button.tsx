import ReactChildren from '@/types/ReactChildren';
import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
    children: ReactChildren;
    onClick?: () => void;
    href?: string;
    label?: string;
}

const Button = ({
    children = [], onClick, href, label, 
}: ButtonProps): React.ReactElement => (
    <div className='button'>
        {(label !== undefined) &&
                <span className='button__label'>{label}</span>
        }

        {
            (href === undefined) ? (
                <div
                    className='button__button'
                    onClick={onClick}
                >
                    {children}
                </div>
            ) : (
                <Link
                    className='button__button'
                    to={href}
                    onClick={onClick}
                >
                    {children}
                </Link>
            )
        }

    </div>
);

export default Button;
