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
import { setToken } from '../../stores/user/userReducer';
import store from '../../stores/globalStore';
import { getLocalToken } from '../../tools/localToken';
import { fetchUser } from '../../stores/user/userStore.tools';
import { fetchGames } from '../../stores/game/gameStore.tools';

function App(): React.ReactElement {
    useEffect(() => {
        document.title = 'Stonkofus';

        store.dispatch(setToken(getLocalToken()));
        fetchUser();
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
                    {/* <Route path="/games/:gameId" element={< Game game="gameId" />} /> */}
                    <Route path="/admin" element={< Admin />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
