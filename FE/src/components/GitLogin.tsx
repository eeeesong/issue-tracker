import styled from 'styled-components';
import {useEffect} from "react";
const GitLogin = () => {
    useEffect(() => {
        //api
      }, []);
    return (
        <GitLoginWrapper>
        <a href="https://github.com/login/oauth/authorize?client_id=96a319df91592ffb39bc">
            <GitHubButton>
            GitHub 계정으로 로그인
            </GitHubButton>
        </a>
        </GitLoginWrapper>
    );
}
const GitHubButton = styled.button`
padding: 20px;
font-size: 25px;
background-color: black;
color: white;
font-weight: 600;
border-radius: 20px;
&:hover {
    background-color: white;
    color: black;
    border: 5px solid black;
}
`;
const GitLoginWrapper = styled.div`
`;

export default GitLogin;
