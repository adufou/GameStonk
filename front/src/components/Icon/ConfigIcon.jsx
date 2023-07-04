import React from 'react';
import { IconContext } from 'react-icons';

export default function ConfigIcon({ children }) {

    return (
        <>
            <IconContext.Provider value={{ size: '1.2rem' }}>
                {children}
            </IconContext.Provider>
        </>
    );
}
