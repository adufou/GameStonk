import React from 'react';
import { GameProvider } from './game/useGameStore';

const StoreProviders = ({children}) => {
    return (
        <GameProvider>
             {children}
        </GameProvider>
    );
};

export default StoreProviders;
