import { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AddButton from "components/common/AddButton";
import Tabs from "components/common/Tabs";
import Filter from "./Filter/Filter";
import List from "./List/List";
import { useRecoilState } from "recoil";
import { LoginState } from "../../atoms/atoms";

const IssueList = () => {
  const [, setIsLogin] = useRecoilState(LoginState);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token !== null) setIsLogin(true);
  }, [token, setIsLogin]);

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
