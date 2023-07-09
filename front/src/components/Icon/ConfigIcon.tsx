import React from 'react';
import { IconContext } from 'react-icons';
import ReactChildren from 'src/types/ReactChildren';

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
