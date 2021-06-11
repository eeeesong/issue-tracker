import { useEffect, useState } from "react";
import styled from "styled-components";

const Header = () => {
  const [profileImg, setProfileImg] = useState("");

  useEffect(() => {
    const profile = localStorage.getItem("profileUrl");
    if (profile) setProfileImg(profile);
  }, [profileImg]);

  return (
    <HeaderWrapper>
      <Title>Issue Tracker</Title>
      <LoginInfo>
        <ProfileIMG src={profileImg}>
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
  border: 2px solid red;
`;

export default Header;
