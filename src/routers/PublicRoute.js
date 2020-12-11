import { Route, useLocation } from "react-router-dom";

const PublicRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default PublicRoute;
