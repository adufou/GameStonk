import React from 'react';
import { IconContext } from 'react-icons';

export default function ConfigIcon({ children }) {

    return (
        <>
            <IconContext.Provider value={{}}>
                {children}
            </IconContext.Provider>
        </>
    );
}
