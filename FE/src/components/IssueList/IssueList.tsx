import styled from "styled-components";
import Filter from "./Filter";

const IssueList = () => (
	<IssueListWrapper>
		<Filter />
	</IssueListWrapper>
);

const IssueListWrapper = styled.div`
	width: 1280px;

	//
	height: 300px;
`;

export default IssueList;
