import styled from "styled-components";

const Header = () => {
  return (
    <HeaderWrapper>
      <Title>Issue Tracker</Title>
      <LoginInfo>login</LoginInfo>
    </HeaderWrapper>
  );
};
const Title = styled.div`
  font-size: 40px;
`;
const LoginInfo = styled.div``;
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 40px 80px;
  border: 2px solid red;
`;

export default Header;
