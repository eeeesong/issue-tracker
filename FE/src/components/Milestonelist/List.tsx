import Header from "./Header";
import styled from "styled-components";
import Main from "./Main";
import { useState } from "react";
const List = ({ isAdding }: { isAdding: boolean }) => {
  return (
    <ListWrapper isAdding={isAdding}>
      <Header />
      <Main />
    </ListWrapper>
  );
};

const ListWrapper = styled.div`
  border: 1px solid gray;
  border-radius: 20px;
  width: 100%;
  position: absolute;
  top: ${({ isAdding }: { isAdding: boolean }) => {
    if (isAdding) return "400px";
    return "60px";
  }};
  /* top: 60px; */
`;

export default List;
