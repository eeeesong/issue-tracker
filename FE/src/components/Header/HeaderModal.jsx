
import { useRecoilState, useRecoilValue} from 'recoil';
import styled from 'styled-components';
import {userInfoAtom} from "../../atoms/atoms";

const HeaderModal = () => {
    const userInfo = useRecoilValue(userInfoAtom)
    const createID = () => {
        let newArr = { ...userInfo };
        return newArr.loginID;
    }
    return (
        <HeaderModalWrapper onClick={e => e.stopPropagation()}>
            <LoginInfo>Sigend in as<br/>{createID()}</LoginInfo>
        </HeaderModalWrapper>
    );
}
const LoginInfo = styled.div`
    padding: 15px;
    font-size: 20px ;
    font-weight: 600;
`;
const HeaderModalWrapper = styled.div`
width: 200px;
height: 100px;
left:90%;
z-index: 1;
background-color: black;
color: white;
position: absolute;
border-radius: 20px;
`

export default HeaderModal;
