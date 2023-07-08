import React from 'react';
import { GlobalProvider } from './useGlobalStore';

const GlobalStoreProvider = ({ children }) => {
    return (
        <GlobalProvider>
            {children}
        </GlobalProvider>
    );
};

export default GlobalStoreProvider;
