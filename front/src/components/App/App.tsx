import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../Auth/Login';
import Navbar from '../Navbar/Navbar';
import Logout from '../Auth/Logout';

function App(): React.ReactElement {
    useEffect(() => {
        document.title = 'Stonkofus';
    }, []);

    return (
        <div>
            <BrowserRouter>
                {/* Le hot reload fonctionne sur Mac ! en faisant docker compose up. Donc le pb vient peut être de WSL
                    @nake89 a de bonnes idées (mettre les fichiers sur WSL direct)
                */}
                {/* https://github.com/microsoft/WSL/issues/4739 */}
                {/* <p>GGGGGGGGGGG</p> */}
                <Navbar />
                <Routes>
                    <Route path="/login" element={< Login />} />
                    <Route path="/logout" element={< Logout />} />
                    {/* <Route path="/signup" element={< Signup />} /> */}
                    {/* <Route path="/wallets" element={< MyWallets />} /> */}
                    {/* <Route path="/games" element={< Games />} /> */}
                    {/* <Route path="/games/:gameId" element={< Game game="gameId" />} /> */}
                    {/* <Route path="/admin" element={< Admin />} /> */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
