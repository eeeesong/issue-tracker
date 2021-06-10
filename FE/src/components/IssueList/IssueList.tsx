import styled from "styled-components";
import Filter from "./Filter/Filter";
import Controller from "./Controller/Controller";
import List from "./List/List";

const IssueList = () => (
  <IssueListWrapper>
    <Filter />
    <Controller />
    <List />
  </IssueListWrapper>
);

const IssueListWrapper = styled.div`
  position: relative;
  width: 1280px;
  height: 300px;
`;

export default IssueList;
