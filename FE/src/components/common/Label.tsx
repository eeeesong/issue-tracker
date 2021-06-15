import styled from "styled-components";

const isDark = (code: string): boolean => {
  const red = code.slice(1, 3);
  const green = code.slice(3, 5);
  const blue = code.slice(5, 7);
  return parseInt(red, 16) > parseInt("A0", 16) && parseInt(green, 16) > parseInt("A0", 16) && parseInt(blue, 16) > parseInt("A0", 16);
};

const Label = ({ name, color_code }: { name: string; color_code: string }) => (
  <LabelWrapper color={color_code}>
    <LabelText isDark={isDark(color_code)}>{name === "" ? "레이블 이름" : name}</LabelText>
  </LabelWrapper>
);

const LabelWrapper = styled.div<{ color: string }>`
  margin-left: 8px;
  padding: 4px 16px;
  background: ${({ color }) => color };
  border-radius: 30px;
`;
const LabelText = styled.div<{ isDark: boolean }>`
  height: 20px;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  color: #fefefe;
  color: ${({ isDark }) => (isDark ? "#000" : "#FEFEFE")};
`;

export default Label;
