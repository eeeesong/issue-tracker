import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import IssueList from "./IssueList/IssueList"

const Root = () => (
	<RootWrapper>
		<RouterComponent />
	</RootWrapper>
);

const RouterComponent = () => (
	<Router>
		<Switch>
			<Route path="/">
        <IssueList />
      </Route>
		</Switch>
	</Router>
);

const RootWrapper = styled.div``;

export default Root;
