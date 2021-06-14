import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "components/Login/Login";
import IssueList from "./IssueList/IssueList";
import Header from "components/Header/Header";
import Callback from "components/Login/Callback";
import NewIssue from "./NewIssue/NewIssue";
import { useRecoilValue } from "recoil";
import { LoginState } from "../atoms/atoms";
import NotFound from "./Error/NotFound";

const Root = () => {
  return (
    <RootWrapper>
      <RouterComponent />
    </RootWrapper>
  );
};
const RouterComponent = () => {
  const isLogin = useRecoilValue(LoginState);
  return (
    <Router>
      {/* reverse */}
      {isLogin && <Header />}
      {/* 라우트 추가 부분 */}
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/issuelist" component={IssueList} />
        <Route path="/newissue" component={NewIssue} />
        <Route path="/callback" component={Callback} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

const RootWrapper = styled.div``;

export default Root;
