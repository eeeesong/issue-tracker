import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { userInfoAtom } from "../../atoms/atoms";
import useComponentVisible from "../common/Modal";
import HeaderModal from "./HeaderModal";

const Header = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(true);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  useEffect(() => {
    const profile = localStorage.getItem("profileUrl");
    const userID = localStorage.getItem("loginID");
    if (profile)
      setUserInfo({ ...userInfo, profileUrl: profile, loginID: userID });
  }, []);
  const createImg = () => {
    let newArr = { ...userInfo };
    return newArr.profileUrl;
  };
  return (
    // <PriceBtn  onClick={() => setIsComponentVisible(!isComponentVisible)}>
    // <Title>요금</Title>
    // <View>
    // {!isCheck() && `금액대 설정`}
    // {isCheck() && <PriceRange>
    //  <div>{numToCash(minVal)}</div>
    //  <div>~</div>
    //  <div>{numToCash(maxVal)}</div>
    // </PriceRange>}
    // </View>
    // {!isComponentVisible && <PriceModal/>}

    <HeaderWrapper ref={ref}>
      <Title>Issue Tracker</Title>
      <LoginInfo onClick={() => setIsComponentVisible(!isComponentVisible)}>
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
