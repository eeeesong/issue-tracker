import { useEffect } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useRecoilState } from "recoil";
import { LoginState } from "../../atoms/atoms";

const AuthRoute = ({ render }: RouteProps) => {
  const [, setIsLogin] = useRecoilState(LoginState);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) setIsLogin((v) => true);
  }, [token, setIsLogin]);
  return (
    <Route
      render={(props) =>
        token ? (
          render && render(props)
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

export default AuthRoute;
