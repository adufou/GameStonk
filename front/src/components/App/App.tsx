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
        <div className='app'>
            <BrowserRouter>
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
