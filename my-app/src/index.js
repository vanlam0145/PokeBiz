import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Home } from "./Home";
import { PrivateRoute } from "./private.route";
import { PrivateAdminRoute } from "./privateadmin.route";
import LogReg from "./LogReg/LogReg";

import HomeAdmin from "./AdminPage/homeAdmin"
import User from "./components/User";
import Test from "./components/body/test";
import { Provider } from "react-redux";
import store from "./ex.js";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LogReg} />
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/user" component={User} />
        <PrivateRoute exact path="/test" component={Test} />
        <PrivateAdminRoute exact path="/admin" component={HomeAdmin} />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(

  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  rootElement
);

