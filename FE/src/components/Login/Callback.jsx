import styled from "styled-components";
import {useEffect} from "react";
import { RouteComponentProps } from "react-router-dom";
interface ICallback {
  location: RouteComponentProps['location'];
  history: RouteComponentProps['history'];
};
const Callback = ({location, history}:ICallback) => {
  console.log(typeof(history))
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
    }
    getData();
  }, [])
  return <>loading...</>;
};


const CallbackWrapper = styled.div``;

export default Callback;

