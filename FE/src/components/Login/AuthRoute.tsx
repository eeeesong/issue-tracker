import { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useRecoilState } from "recoil";
// import { LoginState } from "../../atoms/atoms";
import { useRecoilValue } from "recoil";
import { LoginState } from "../../atoms/atoms";
const AuthRoute = ({ component: Component, render, ...rest }) => {
  const [, setIsLogin] = useRecoilState(LoginState);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token !== null) setIsLogin((v) => true);
  }, [token]);
  return (
    <Route
      {...rest}
      render={(props) =>
        token !== null ? (
          render ? (
            render(props)
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

export default AuthRoute;
