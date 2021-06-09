import styled from "styled-components";

const FilterInput = ({ input }: { input: string }) => (
  <InputWrapper>
    <GlassIcon />
    <InputText>{input}</InputText>
  </InputWrapper>
);

const GlassIcon = () => (
  <GlassWrapper>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
        stroke="#A0A3BD"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 14L11.1 11.1" stroke="#A0A3BD" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </GlassWrapper>
);

const InputWrapper = styled.div`
  position: absolute;
  width: 473px;
  height: 40px;
  left: 128px;
  top: 0px;
  background: #eff0f6;
  border-radius: 0px 11px 11px 0px;
`;
const InputText = styled.div`
  position: absolute;
  width: 400px;
  height: 28px;
  left: 48px;
  top: 6px;
  font-size: 16px;
  line-height: 28px;
  color: #a0a3bd;
`;
const GlassWrapper = styled.div`
  position: absolute;
  left: 24px;
  top: 12px;
`;

export default FilterInput;
