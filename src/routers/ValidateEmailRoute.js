import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ValidateEmailRoute = ({
  component: Component,
  auth: { isAuthenticated, isValidated },
  ...rest
}) => {
  return isAuthenticated && isValidated ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : (
    <Redirect to={{ pathname: "/xac-thuc-tai-khoan" }} />
  );
};

const mapStateToProps = (state) => {
  return {
    auth: {
      ...state.auth,
    },
  };
};

export default connect(mapStateToProps)(ValidateEmailRoute);
