import styled from "styled-components";
import AddButton from "components/common/AddButton";
import Tabs from "components/common/Tabs";
import Filter from "./Filter/Filter";
import List from "./List/List";

const IssueList = () => (
  <IssueListWrapper>
    <AddButton text="이슈 작성" onClick={()=>console.log("기능추가요망")}/>
    <Tabs left={823} type="ISSUE"/>
    <Filter />
    <List />
  </IssueListWrapper>
);

const IssueListWrapper = styled.div`
  position: relative;
  width: 1280px;
  height: 300px;
`;

export default IssueList;
