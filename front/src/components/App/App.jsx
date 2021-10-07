import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import React, { useState } from "react";

import Dashboard from "../Dashboard/Dashboard";
import Navbar from "../Navbar/Navbar";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import Logout from "../Auth/Logout";
import Companion from "../Companion/Companion";
import Holdings from "../Holdings/Holdings";

function App() {
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
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/companion" component={Companion} />
                  <Route exact path="/holdings" component={Holdings} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/logout" component={Logout} />
                  <Route exact path="/signup" component={Signup} />
              </Switch>
          </Router>
      </div>
  );
}

export default App;
