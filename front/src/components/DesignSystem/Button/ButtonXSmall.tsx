import React from 'react';
import { Link } from 'react-router-dom';
import ReactChildren from '@/types/ReactChildren';

interface ButtonXSmallProps {
    children: ReactChildren;
    onClick?: () => void;
    href?: string;
    label?: string;
}

const ButtonXSmall = ({
    children = [], onClick, href, label,
}: ButtonXSmallProps): React.ReactElement => (
    <div className='button-xsmall'>
        {(label !== undefined) &&
            <span className='button-xsmall__label'>{label}</span>
        }

        {
            (href === undefined) ? (
                <div
                    className='button-xsmall__button'
                    onClick={onClick}
                >
                    {children}
                </div>
            ) : (
                <Link
                    className='button-xsmall__button'
                    to={href}
                    onClick={onClick}
                >
                    {children}
                </Link>
            )
        }

    </div>
);

export default ButtonXSmall;
