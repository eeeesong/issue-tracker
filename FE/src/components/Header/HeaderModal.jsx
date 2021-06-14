
import {useRecoilValue} from 'recoil';
import styled from 'styled-components';
import {userInfoAtom} from "../../atoms/atoms";

const HeaderModal = ({}) => {
    const userInfo = useRecoilValue(userInfoAtom)
    const createID = () => {
        let newObj= { ...userInfo };
        return newObj.loginID;
    }
    const removeUserInfo = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("profileUrl");
        localStorage.removeItem("loginID");
    }
    return (
        <HeaderModalWrapper onClick={e => e.stopPropagation()}>
            <LoginInfo>Sigend in as</LoginInfo>
            <LoginInfo>{createID()}</LoginInfo>
            <hr/>
            <LogOutBox onClick={removeUserInfo}>Sign out</LogOutBox>
        </HeaderModalWrapper>
    );
}
const LogOutBox = styled.div`
font-size:20px;
font-weight: 600;
padding: 15px;
margin-bottom: 15px;
&:hover {
    background-color: blue;
}
`;
const LoginInfo = styled.div`
    padding: 15px 0px 0px 15px;
    font-size: 20px ;
    font-weight: 600;
&:nth-child(2) {
    margin-bottom: 10px;
}
`;
const HeaderModalWrapper = styled.div`
/* padding: 15px; */
width: 200px;
/* height: 100px; */
left:90%;
z-index: 1;
background-color: black;
color: white;
position: absolute;
border-radius: 20px;
`

export default HeaderModal;
