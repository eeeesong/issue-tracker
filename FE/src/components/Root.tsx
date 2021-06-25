import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "components/Login/Login";
import IssueList from "./IssueList/IssueList";
import LabelList from "./LabelList/LabelList";
import NewIssue from "./NewIssue/NewIssue";
import Header from "components/Header/Header";
import Callback from "components/Login/Callback";
import DetailIssue from "./DetailIssue/DetailIssue";
import { useRecoilValue } from "recoil";
import { LoginState } from "../atoms/atoms";
import NotFound from "./Error/NotFound";
import AuthRoute from "./Login/AuthRoute";
import Milestonelist from "./Milestonelist/Milestonelist";

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
        <AuthRoute
          path="/issuelist"
          render={(props: any) => <IssueList {...props} />}
        />
        <AuthRoute
          path="/milestonelist"
          render={(props: any) => <Milestonelist {...props} />}
        />
        <Route path="/labellist" component={LabelList} />
        <Route path="/newissue" component={NewIssue} />
        <Route path="/detailissue" component={DetailIssue} />
        <Route path="/callback" component={Callback} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

const RootWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

export default Root;