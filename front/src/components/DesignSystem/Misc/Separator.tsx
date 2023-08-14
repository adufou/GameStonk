import React, { useMemo } from 'react';

interface SeparatorProps {
    className?: string
}

const Separator = ({ className }: SeparatorProps): React.ReactElement => {
    const separatorClassName = useMemo(() => {
        let name = 'separator ';
        name += className ? className : 'separator-base-color';
        
        return name;
    }, []);
    
    return (
        <div className={separatorClassName}/>
    );
};

export default Separator;
