import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Dashboard from "components/Dashboard";
import React from "react";

const App = () => (
  <div>
    <link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css"/>
    <script src="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"/>
  
    <Router>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  </div>
);

export default App;
