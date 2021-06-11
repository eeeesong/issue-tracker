import { MouseEventHandler } from "react";
import styled from "styled-components";

const AddButton = ({ text, onClick }: { text: string; onClick: MouseEventHandler }) => {
  return (
    <AddButtonWrapper onClick={onClick}>
      <PlusIcon />
      <ButtonText>{text}</ButtonText>
    </AddButtonWrapper>
  );
};

const PlusIcon = () => (
  <IconWrapper>
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.5 3.33337V12.6667" stroke="#FEFEFE" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.83325 8H13.1666" stroke="#FEFEFE" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </IconWrapper>
);

const AddButtonWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 40px;
  right: 0px;
  background: #007aff;
  border-radius: 11px;
`;
const ButtonText = styled.div`
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  color: #fefefe;
  margin-left: 1px;
`;
const IconWrapper = styled.div`
  position: relative;
  top: 1px;
`;

export default AddButton;
