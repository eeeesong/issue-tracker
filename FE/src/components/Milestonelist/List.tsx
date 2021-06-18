import Header from "./Header";
import styled from "styled-components";
import Main from "./Main";
import { useState } from "react";
const List = ({ isAdding }: { isAdding: boolean }) => {
  return (
    <ListWrapper>
      <Header />
      <Main />
    </ListWrapper>
  );
};

const ListWrapper = styled.div`
  border: 1px solid gray;
  border-radius: 20px;
  width: 100%;
  /* height: 50vh; */
  position: absolute;
  top: 60px;
  /* &:nth-child(1) {
    background-color: gray;
  } */
`;

export default List;
