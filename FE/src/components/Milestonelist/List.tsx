import Header from "./Header";
import styled from "styled-components";
import Main from "./Main";
import { useState } from "react";
const List = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <ListWrapper isOpen={isOpen}>
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
  top: ${({ isOpen }: { isOpen: boolean }) => {
    if (isOpen) return "400px";
    return "60px";
  }};
`;

export default List;
