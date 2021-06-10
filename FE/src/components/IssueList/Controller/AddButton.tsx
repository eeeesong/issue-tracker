import styled from "styled-components";

const AddButton = () => {
  return (
    <AddButtonWrapper>
      <ButtonText>이슈 작성</ButtonText>
      <PlusIcon />
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
  width: 120px;
  height: 40px;
  left: 337px;
  background: #007aff;
  border-radius: 11px;
`;
const ButtonText = styled.div`
  position: absolute;
  left: 46.5px;
  top: 10px;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  color: #fefefe;
`;
const IconWrapper = styled.div`
  position: absolute;
  left: 22.08%;
  right: 64.58%;
  top: 30%;
  bottom: 30%;
`;

export default AddButton;