import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated },
  ...rest
}) => {
  return isAuthenticated ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : (
    <Redirect to={{ pathname: "/dang-nhap" }} />
  );
};

const mapStateToProps = (state) => {
  return {
    auth: {
      ...state.auth,
    },
  };
};

export default connect(mapStateToProps)(PrivateRoute);
