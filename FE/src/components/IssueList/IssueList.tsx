import styled from "styled-components";
import Filter from "./Filter/Filter";
import Controller from "./Controller/Controller"

const IssueList = () => (
	<IssueListWrapper>
		<Filter />
    <Controller />
	</IssueListWrapper>
);

const IssueListWrapper = styled.div`
	width: 1280px;

	//
	height: 300px;
`;

export default IssueList;
