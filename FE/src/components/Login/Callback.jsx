import styled from "styled-components";
import {useEffect} from "react";
import { RouteComponentProps } from "react-router-dom";
interface Props extends RouteComponentProps {};
const Callback = ({location, history}:Props) => {
  useEffect(() => {
    const getData = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      console.log(code);
      const res = await fetch(`http://3.34.122.67/api/login/web?code=${code}`);
      const json = await res.json();
      console.log(json);

      localStorage.setItem("token", json.jwt);
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

