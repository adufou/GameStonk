import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import React, {useEffect, useState} from "react";

import Navbar from "../Navbar/Navbar";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import Logout from "../Auth/Logout";
import MyWallets from "../Wallet/MyWallets"
import Games from "../Game/Games"
import Admin from "../Admin/Admin";

function App() {
    useEffect(() => {
        document.title = "Stonkofus"
    }, [])

    return (
      <div>
          <link
              rel="stylesheet"
              href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css"
          />
          <script src="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.js" />

          <Router>
              <Navbar/>
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
