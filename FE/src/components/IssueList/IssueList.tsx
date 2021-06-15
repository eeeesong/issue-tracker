import styled from "styled-components";
import { Link } from "react-router-dom";
import AddButton from "components/common/AddButton";
import Tabs from "components/common/Tabs";
import Filter from "./Filter/Filter";
import List from "./List/List";

const IssueList = () => {
  return (
    <IssueListWrapper>
      <Link to={"/newissue"}>
        <AddButton text="이슈 작성" />
      </Link>
      <Tabs left={823} type="ISSUE" />
      <Filter />
      <List />
    </IssueListWrapper>
  );
};

const IssueListWrapper = styled.div`
  position: relative;
  width: 1280px;
`;

export default IssueList;
