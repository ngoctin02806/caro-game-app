import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PreventRoute = ({
  component: Component,
  auth: { isAuthenticated },
  ...rest
}) => {
  return !isAuthenticated ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : (
    <Redirect to={{ pathname: "/counter" }} />
  );
};

const mapStateToProps = (state) => {
  return {
    auth: {
      ...state.auth,
    },
  };
};

export default connect(mapStateToProps)(PreventRoute);
