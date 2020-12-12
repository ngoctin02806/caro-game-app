import "./App.css";
import "antd/dist/antd.css";

/* Import all config */
import "./config/axios.config";
import "./config/socket.config";

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";

import PublicRoute from "./routers/PublicRoute";
import ValidateEmailRoute from "./routers/ValidateEmailRoute";
import PreventRoute from "./routers/PreventRoute";
import PrivateRoute from "./routers/PrivateRoute";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ValidateEmail from "./pages/ValidateEmail";
import GameDashboard from "./pages/GameDashboard";

import {
  increaseCounter,
  decreaseCounter,
} from "./redux/Counter/counter.actions";
import { autoLogoutMiddleware } from "./redux/Auth/auth.middlewares";

const App = (props) => {
  const { auth, autoLogout } = props;

  useEffect(() => {
    autoLogout();
  }, [auth.isAuthenticated]);

  return (
    <>
      <Header />
      <Switch>
        <PreventRoute exact path="/">
          <Home />
        </PreventRoute>
        <PreventRoute path="/dang-nhap">
          <Login />
        </PreventRoute>
        <PreventRoute path="/dang-ky">
          <Register />
        </PreventRoute>
        <ValidateEmailRoute path="/counter">
          <div className="App">
            <div>Count: {props.count}</div>

            <button onClick={() => props.increaseCounter()}>
              Increase Count
            </button>

            <button onClick={() => props.decreaseCounter()}>
              Decrease Count
            </button>
          </div>
        </ValidateEmailRoute>
        <ValidateEmailRoute path="/trang-chu">
          <GameDashboard />
        </ValidateEmailRoute>
        <PrivateRoute path="/xac-thuc-tai-khoan">
          <ValidateEmail />
        </PrivateRoute>
        <PublicRoute>
          <div>Not found</div>
        </PublicRoute>
      </Switch>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    count: state.counter.count,
    auth: {
      ...state.auth,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increaseCounter: () => dispatch(increaseCounter()),
    decreaseCounter: () => dispatch(decreaseCounter()),
    autoLogout: () => dispatch(autoLogoutMiddleware()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
