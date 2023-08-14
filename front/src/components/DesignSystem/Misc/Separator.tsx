import React, { useMemo } from 'react';
import { classNames } from '@/tools/classNames';

interface SeparatorProps {
    className?: string
}

const Separator = ({ className }: SeparatorProps): React.ReactElement => {
    const separatorClassName = useMemo(() => {
        return classNames('separator', className ? [className] : ['separator-base-color']);
    }, []);
    
    return (
        <div className={separatorClassName}/>
    );
};

export default Separator;
