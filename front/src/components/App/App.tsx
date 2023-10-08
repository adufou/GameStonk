import React, { useEffect } from 'react';
import {
    BrowserRouter,
    Route,
    Routes,
} from 'react-router-dom';
import Admin from '@/components/Admin/Admin';
import Login from '@/components/Auth/Login';
import Signup from '@/components/Auth/Signup';
import Games from '@/components/Game/Games';
import Navbar from '@/components/Navbar/Navbar';
import MyWallets from '@/components/Wallet/MyWallets';
import { authFlowOnStartup } from '@/tools/authTools';

function App(): React.ReactElement {
    useEffect(() => {
        document.title = 'GameStonk';

        authFlowOnStartup();
    }, []);

    return (
        <div className='App'>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route
                        path="/login"
                        element={< Login />}
                    />
                    <Route
                        path="/signup"
                        element={< Signup />}
                    />
                    <Route
                        path="/wallets"
                        element={< MyWallets />}
                    />
                    <Route
                        path="/games"
                        element={< Games />}
                    />
                    {/* <Route path="/games/:gameId" element={< GameModel games="gameId" />} /> */}
                    <Route
                        path="/admin"
                        element={< Admin />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
