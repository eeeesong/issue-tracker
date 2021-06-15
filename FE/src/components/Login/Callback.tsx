import { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";

interface ICallback {
  history: RouteComponentProps["history"];
}

const Callback = ({ history }: ICallback) => {
  useEffect(() => {
    const getData = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const res = await fetch(`http://3.34.122.67/api/login/web?code=${code}`);
      const json = await res.json();
      localStorage.setItem("token", json.jwt.jwt);
      localStorage.setItem("profileUrl", json.avatarUrl);
      localStorage.setItem("loginID", json.loginId);
      history.push("/issuelist");
    };
    getData();
  }, [history]);
  return <>loading...</>;
};

export default Callback;