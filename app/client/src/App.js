import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import AddPlayer from "./components/player/AddPlayer";
import AllPlayer from "./components/player/AllPlayer";
import EditPlayer from "./components/player/EditPlayer";
import PlayerView from "./components/player/PlayerView";
import AddTeam from "./components/team/AddTeam";
import AllTeam from "./components/team/AllTeam";
import EditTeam from "./components/team/EditTeam";
import TeamView from "./components/team/TeamView";

import "./App.css";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/addplayer" component={AddPlayer} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/players" component={AllPlayer} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/player/edit/:id"
                component={EditPlayer}
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/player/:id" component={PlayerView} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/addteam" component={AddTeam} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/teams" component={AllTeam} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/team/edit/:id" component={EditTeam} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/team/:id" component={TeamView} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
