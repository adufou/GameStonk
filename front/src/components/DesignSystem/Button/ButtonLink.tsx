import React from 'react';
import { Link } from 'react-router-dom';
import ReactChildren from '@/types/ReactChildren';

interface ButtonLinkProps {
    children: ReactChildren;
    onClick?: () => void;
    href?: string;
    label?: string;
}

const ButtonLink = ({
    children = [], onClick, href, label,
}: ButtonLinkProps): React.ReactElement => (
    <div className='button-link'>
        {(label !== undefined) &&
            <span className='button-link__label'>{label}</span>
        }

        {
            (href === undefined) ? (
                <div
                    className='button-link__button'
                    onClick={onClick}
                >
                    {children}
                </div>
            ) : (
                <Link
                    className='button-link__button'
                    to={href}
                    onClick={onClick}
                >
                    {children}
                </Link>
            )
        }

    </div>
);

export default ButtonLink;
