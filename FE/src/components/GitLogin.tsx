import styled from 'styled-components';

const GitLogin = () => {
    return (
        <GitLoginWrapper>
          GitHub 계정으로 로그인
        </GitLoginWrapper>
    );
}

const GitLoginWrapper = styled.button`
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
`

export default GitLogin;
