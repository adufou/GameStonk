import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import ReactChildren from '@/types/ReactChildren';

interface ButtonProps {
    children: ReactChildren;
    onClick?: () => void;
    href?: string;
    label?: string;
    className?: string;
}

const Button = ({
    children = [], onClick, href, label, className,
}: ButtonProps): React.ReactElement => {
    const buttonClassName = useMemo(() => {
        let name = 'button';
        if (className) {
            name += ` ${ className }`;
        }
        
        return name;
    }, []);
    
    return (
        <div className={buttonClassName}>
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
};

export default Button;
