import { MouseEventHandler } from "react";
import styled from "styled-components";

const AddButton = ({
  text,
  onClick,
  isOpen,
  isAdding,
  openEdit,
}: {
  text: string;
  onClick?: MouseEventHandler;
  isOpen?: boolean;
  isAdding?: boolean | undefined;
  openEdit?: boolean;
}) => {
  return (
    <AddButtonWrapper openEdit={openEdit} text={text} onClick={onClick}>
      {!openEdit && !isOpen && <PlusIcon />}
      {!openEdit && isOpen && <CloseIcon />}
      <ButtonText>{text}</ButtonText>
    </AddButtonWrapper>
  );
};

const PlusIcon = () => (
  <IconWrapper>
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.5 3.33337V12.6667"
        stroke="#FEFEFE"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.83325 8H13.1666"
        stroke="#FEFEFE"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </IconWrapper>
);

const CloseIcon = () => (
  <IconWrapper>
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.29991 1.70023L1.70025 8.29989M1.7002 1.70016L8.29986 8.29983"
        stroke="#FEFEFE"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </IconWrapper>
);

const AddButtonWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 40px;
  right: 0px;
  top: ${({ text, openEdit }: { text: string; openEdit?: boolean }) => {
    if (!openEdit && text === "완료") return "220px";
    // if (text === "에1") return "300px";
    else return;
  }};
  left: ${({ text, openEdit }: { text: string; openEdit?: boolean }) => {
    if (!openEdit && text === "완료") return "1108px";
    if (text === "취소") return "950px";
    if (openEdit && text === "완료") return "1130px";
    else return;
  }};
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
