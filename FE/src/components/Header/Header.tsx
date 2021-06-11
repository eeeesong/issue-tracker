import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { userInfoAtom } from "../../atoms/atoms";

const Header = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  useEffect(() => {
    const profile = localStorage.getItem("profileUrl");
    if (profile) setUserInfo({ ...userInfo, profileUrl: profile });
  }, []);
  const createImg = () => {
    let newArr = { ...userInfo };
    return newArr.profileUrl;
  };
  return (
    <HeaderWrapper>
      <div></div>
      <Title>Issue Tracker</Title>
      <LoginInfo>
        <ProfileIMG src={createImg()}>
          {/* <img src={profileImg}></img> */}
        </ProfileIMG>
      </LoginInfo>
    </HeaderWrapper>
  );
};
const ProfileIMG = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-size: cover;
`;
const Title = styled.div`
  font-size: 40px;
`;
const LoginInfo = styled.div``;
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 40px 80px;
`;

export default Header;
