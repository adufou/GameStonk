import ReactChildren from '@/types/ReactChildren';
import React from 'react';
import { IconContext } from 'react-icons';

interface ConfigIconProps {
    children: ReactChildren
}

export default function ConfigIcon({ children }: ConfigIconProps): React.ReactElement {
    return (
        <>
            <IconContext.Provider value={{}}>
                {children}
            </IconContext.Provider>
        </>
    );
}
