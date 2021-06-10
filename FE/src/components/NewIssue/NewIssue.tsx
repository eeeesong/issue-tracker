import { useState } from "react";
import styled from "styled-components";
import Content from "./Content";

const NewIssue = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const content = { title, setTitle, body, setBody };
  return (
    <NewIssueWrapper>
      <Header>새로운 이슈 작성</Header>
      <Line />
      <Content {...content} />
      <Line />
      <Buttons>
        <AddButton isActivated={title.length > 0}>완료</AddButton>
        <CancelButton>
          <CancelIcon />
          <CancelText>작성 취소</CancelText>
        </CancelButton>
      </Buttons>
    </NewIssueWrapper>
  );
};

const CancelIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.2999 4.70026L4.70025 11.2999M4.7002 4.7002L11.2999 11.2999"
      stroke="#6E7191"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const NewIssueWrapper = styled.div`
  position: relative;
  width: 1280px;
`;
const Header = styled.div`
  position: relative;
  width: 221px;
  height: 48px;
  font-size: 32px;
  line-height: 48px;
  color: #14142b;
`;
const Line = styled.div`
  position: relative;
  width: 1280px;
  height: 1px;
  margin-top: 32px;
  background: #d9dbe9;
  transform: matrix(1, 0, 0, -1, 0, 0);
`;
const Buttons = styled.div`
  position: relative;
  margin-top: 32px;
  right: 0px;
`;
const AddButton = styled.div<{ isActivated: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 240px;
  height: 56px;
  right: 0px;
  top: 0px;
  background: #007aff;
  border-radius: 20px;
  color: #fefefe;
  opacity: 0.5;
  opacity: ${({ isActivated }) => (isActivated ? 1 : 0.5)};
`;
const CancelButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 83px;
  height: 32px;
  right: 272px;
  top: 12px;
`;
const CancelText = styled.div`
  margin-left: 4px;
  font-weight: bold;
  font-size: 16px;
  line-height: 28px;
  color: #6e7191;
`;

export default NewIssue;
