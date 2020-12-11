import { Route, Redirect, useLocation } from "react-router-dom";
import { connect } from "react-redux";

const PreventRoute = ({
  component: Component,
  auth: { isAuthenticated },
  ...rest
}) => {
  const location = useLocation();

  return !isAuthenticated ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : (
    <Redirect to={{ pathname: "/trang-chu" }} />
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
