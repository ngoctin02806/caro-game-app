import "./App.css";
import "antd/dist/antd.css";
import "ant-design-draggable-modal/dist/index.css";

/* Import all config */
import "./config/axios.config";
import socket from "./config/socket.config";

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";
import { notification } from "antd";

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
import NotFound from "./pages/NotFound";

import { errorResponse } from "./utils/errorResponse";

import { clearErrors } from "./redux/Error/error.actions";

import {
  increaseCounter,
  decreaseCounter,
} from "./redux/Counter/counter.actions";
import { autoLogoutMiddleware } from "./redux/Auth/auth.middlewares";

const openNotification = (placement, error, callback) => {
  notification.error({
    message: `Lỗi người dùng`,
    description: error,
    placement,
    onClose: callback,
  });
};

const App = (props) => {
  const { error, auth, autoLogout, clearErrors } = props;

  useEffect(() => {
    autoLogout();
  }, [autoLogout, auth.isAuthenticated]);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      // Create conversations in localStorage
      localStorage.setItem("conversations", JSON.stringify([]));
    }

    if (auth.isAuthenticated) {
      socket.emit("emit-user-login", { user_id: auth.profileId });

      socket.emit(
        "emit-rejoin-room",
        JSON.parse(localStorage.getItem("conversations"))
      );
    }
  }, [auth.profileId, auth.isAuthenticated]);

  useEffect(() => {
    if (error.code) {
      openNotification("topRight", errorResponse(error.code), clearErrors);
    }
  }, [error.code, clearErrors]);

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
          <NotFound />
        </PublicRoute>
      </Switch>
      {!auth.isAuthenticated && <Footer />}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    count: state.counter.count,
    auth: {
      ...state.auth,
    },
    error: {
      ...state.error,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increaseCounter: () => dispatch(increaseCounter()),
    decreaseCounter: () => dispatch(decreaseCounter()),
    autoLogout: () => dispatch(autoLogoutMiddleware()),
    clearErrors: () => dispatch(clearErrors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
