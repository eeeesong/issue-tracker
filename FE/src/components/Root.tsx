import { useState } from "react";
import { RecoilRoot } from "recoil";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import IssueList from "./IssueList/IssueList";
import NewIssue from "./NewIssue/NewIssue"
import Header from "./Header/Header";

const Root = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <RecoilRoot>
      <RootWrapper>
        <RouterComponent isLogin={isLogin} />
      </RootWrapper>
    </RecoilRoot>
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
      <Route path="/issuelist" component={IssueList} />
      <Route path="/newissue" component={NewIssue} />
    </Switch>
  </Router>
);

const RootWrapper = styled.div``;

export default Root;
