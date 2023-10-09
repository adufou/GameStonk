import React, {
    useEffect,
    useState,
} from 'react';
import { useQueryClient } from 'react-query';
import {
    Route,
    Routes,
    useNavigate,
} from 'react-router-dom';
import Admin from '@/components/Admin/Admin';
import Login from '@/components/Auth/Login';
import Signup from '@/components/Auth/Signup';
import Games from '@/components/Game/Games';
import Navbar from '@/components/Navbar/Navbar';
import MyWallets from '@/components/Wallet/MyWallets';
import { authFlowOnStartup } from '@/tools/authTools';

function App(): React.ReactElement {
    const [isUserLogged, setIsUserLogged] = useState(false);
    
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    useEffect(() => {
        document.title = 'GameStonk';

        authFlowOnStartup(
            queryClient, 
            () => navigate('login'),
            () => setIsUserLogged(true),
        );
    }, []);

    return (
        <div className='App'>
            <Navbar isUserLogged={isUserLogged}/>
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
        </div>
    );
}

export default App;
