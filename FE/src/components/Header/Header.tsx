import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { userInfoAtom } from "../../atoms/atoms";
import useComponentVisible from "../common/Modal";
import HeaderModal from "./HeaderModal";
import { useRecoilValue } from "recoil";
import { LoginState } from "../../atoms/atoms";

const Header = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(true);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const isLogin = useRecoilValue(LoginState);
  useEffect(() => {
    const profile = localStorage.getItem("profileUrl");
    const userID: string | null = localStorage.getItem("loginID");
    if (profile)
      setUserInfo((userInfo) => ({
        ...userInfo,
        profileUrl: profile,
        loginID: userID,
      }));
  }, [isLogin, setUserInfo]);
  const createImg = () => {
    let newObj = { ...userInfo };
    return newObj.profileUrl;
  };
  return (
    <HeaderWrapper>
      <Title>Issue Tracker</Title>
      <LoginInfo
        ref={ref}
        onClick={() => setIsComponentVisible(!isComponentVisible)}
      >
        <ProfileIMG src={createImg()}>
          {/* <img src={profileImg}></img> */}
        </ProfileIMG>
        {!isComponentVisible && <HeaderModal />}
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
