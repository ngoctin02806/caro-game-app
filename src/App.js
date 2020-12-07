import "./App.css";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";

import {
  increaseCounter,
  decreaseCounter,
} from "./redux/Counter/counter.actions";

const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/counter">
          <div className="App">
            <div>Count: {props.count}</div>

            <button onClick={() => props.increaseCounter()}>
              Increase Count
            </button>

            <button onClick={() => props.decreaseCounter()}>
              Decrease Count
            </button>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    count: state.counter.count,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increaseCounter: () => dispatch(increaseCounter()),

    decreaseCounter: () => dispatch(decreaseCounter()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
