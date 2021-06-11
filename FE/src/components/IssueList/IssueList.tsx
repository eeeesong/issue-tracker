import { useEffect } from "react";
import styled from "styled-components";
import Filter from "./Filter/Filter";
import Controller from "./Controller/Controller";
import List from "./List/List";
import { RecoilRoot, useRecoilState, atom, useRecoilValue } from "recoil";
import { LoginState } from "../../atoms/atoms";

const IssueList = () => {
  const [, setIsLogin] = useRecoilState(LoginState);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token !== null) setIsLogin((v) => true);
    // console.log(login);
  }, [token]);

  return (
    <IssueListWrapper>
      <Filter />
      <Controller />
      <List />
    </IssueListWrapper>
  );
};

const IssueListWrapper = styled.div`
  position: relative;
  width: 1280px;
  height: 300px;
`;

export default IssueList;
