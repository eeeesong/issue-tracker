import React, { useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import IssueList from "./IssueList/IssueList";
import Header from "./Header/Header";

const Root = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <RootWrapper>
      <RouterComponent isLogin={isLogin} />
    </RootWrapper>
  );
};
type Props = {
  isLogin: boolean;
};
const RouterComponent = ({ isLogin }: Props) => (
  <Router>
    {/* reverse */}
    {!isLogin && (
      <Switch>
        <Header />
      </Switch>
    )}
    {/* 라우트 추가 부분 */}
    <Switch>
      <Route path="/" component={Login} exact />
      <Route path="/list" component={IssueList} />
    </Switch>
  </Router>
);

const RootWrapper = styled.div``;

export default Root;
