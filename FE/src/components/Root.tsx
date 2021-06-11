import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "components/Login/Login";
import IssueList from "./IssueList/IssueList";
import LabelList from "./LabelList/LabelList"
import NewIssue from "./NewIssue/NewIssue"
import Header from "components/Header/Header";
import Callback from "components/Login/Callback";
import { useRecoilValue } from "recoil";
import { LoginState } from "../atoms/atoms";

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
      {isLogin && (
        <Switch>
          <Header />
        </Switch>
      )}
      {/* 라우트 추가 부분 */}
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/issuelist" component={IssueList} />
        <Route path="/labellist" component={LabelList} />
        <Route path="/newissue" component={NewIssue} />
        <Route path="/callback" component={Callback} />
      </Switch>
    </Router>
  );
};

const RootWrapper = styled.div``;

export default Root;
