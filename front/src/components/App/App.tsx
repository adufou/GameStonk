import './App.scss';
import Admin from '@/components/Admin/Admin';
import Login from '@/components/Auth/Login';
import Logout from '@/components/Auth/Logout';
import Signup from '@/components/Auth/Signup';
import Games from '@/components/Game/Games';
import Navbar from '@/components/Navbar/Navbar';
import MyWallets from '@/components/Wallet/MyWallets';
import { fetchGames } from '@/stores/game/gameStore.tools';
import {authFlowOnStartup} from '@/tools/authTools';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App(): React.ReactElement {
    useEffect(() => {
        document.title = 'GameStonk';

        authFlowOnStartup();
        fetchGames().catch((e) => {
            console.warn(e);
        });
    }, []);

    return (
        <div className='App'>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/login" element={< Login />} />
                    <Route path="/logout" element={< Logout />} />
                    <Route path="/signup" element={< Signup />} />
                    <Route path="/wallets" element={< MyWallets />} />
                    <Route path="/games" element={< Games />} />
                    {/* <Route path="/games/:gameId" element={< Game games="gameId" />} /> */}
                    <Route path="/admin" element={< Admin />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
