import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './Login';

const Root = () => (
	<RootWrapper>
		<RouterComponent />
	</RootWrapper>
);

const RouterComponent = () => (
	<Router>
		<Switch>
			<Route path="/">
        <Login/>
      </Route>
		</Switch>
	</Router>
);

const RootWrapper = styled.div``;

export default Root;
