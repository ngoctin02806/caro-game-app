import "./App.css";
import "antd/dist/antd.css";

import "./config/axios.config";

import { connect } from "react-redux";
import { Switch } from "react-router-dom";

import PublicRoute from "./routers/PublicRoute";
// import PrivateRoute from "./routers/PrivateRoute";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";

import {
  increaseCounter,
  decreaseCounter,
} from "./redux/Counter/counter.actions";

const App = (props) => {
  return (
    <>
      <Header />
      <Switch>
        <PublicRoute exact path="/">
          <Home />
        </PublicRoute>
        <PublicRoute path="/dang-nhap">
          <Login />
        </PublicRoute>
        <PublicRoute exact path="/counter">
          <div className="App">
            <div>Count: {props.count}</div>

            <button onClick={() => props.increaseCounter()}>
              Increase Count
            </button>

            <button onClick={() => props.decreaseCounter()}>
              Decrease Count
            </button>
          </div>
        </PublicRoute>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
