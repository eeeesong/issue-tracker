import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "components/Login/Login";
import IssueList from "./IssueList/IssueList";
import Header from "components/Header/Header";
import Callback from "components/Login/Callback";
import NewIssue from "./NewIssue/NewIssue";

const Root = () => {
  const [isLogin, setIsLogin] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    console.log(token);
    if (token) setIsLogin(true);
    console.log(isLogin);
  }, [token]);

  return (
    <RootWrapper>
      <RouterComponent isLogin={isLogin} />
    </RootWrapper>
  );
};
type Props = {
  isLogin: boolean;
};
const RouterComponent = ({ isLogin }: Props) => {
  console.log("dididid", isLogin);
  return (
    <Router>
      {/* reverse */}
      {isLogin && (
        <Switch>
          <Header />
        </Switch>
      )}
      {/* 라우트 추가 부분 */}
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/issuelist" component={IssueList} />
        <Route path="/newissue" component={NewIssue} />
        <Route path="/callback" component={Callback} />
      </Switch>
    </Router>
  );
};

const RootWrapper = styled.div``;

export default Root;
