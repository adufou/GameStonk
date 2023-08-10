import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../Auth/Login';
import Navbar from '../Navbar/Navbar';
import Logout from '../Auth/Logout';
import Signup from '../Auth/Signup';
import './App.scss';
import Games from '../Game/Games';
import MyWallets from '../Wallet/MyWallets';
import Admin from '../Admin/Admin';
import { fetchGames } from '../../stores/game/gameStore.tools';
import {authFlowOnStartup} from "../../tools/authTools";

function App(): React.ReactElement {
    useEffect(() => {
        document.title = 'GameStonk';

        authFlowOnStartup();
        fetchGames();
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
