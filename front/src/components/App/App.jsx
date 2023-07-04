import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';

import Admin from '../Admin/Admin';
import Login from '../Auth/Login';
import Logout from '../Auth/Logout';
import Signup from '../Auth/Signup';
import Games from '../Game/Games';
import Navbar from '../Navbar/Navbar';
import MyWallets from '../Wallet/MyWallets';

function App() {
    useEffect(() => {
        document.title = 'Stonkofus';
    }, []);

    return (
        <div>
            <link
                rel="stylesheet"
                href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css"
            />
            <script src="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.js" />

            <Router>
                <Navbar />
                <Switch>
                    {/* <Route exact path="/dashboard" component={Dashboard} /> */}
                    {/* <Route exact path="/companion" component={Companion} /> */}
                    {/* <Route exact path="/holdings" component={Holdings} /> */}
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/logout" component={Logout} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/wallets" component={MyWallets} />
                    <Route exact path="/games" component={Games} />
                    <Route exact path="/admin" component={Admin} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
