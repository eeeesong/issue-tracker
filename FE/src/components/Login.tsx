import styled from 'styled-components';
import GitLogin from './GitLogin';

const Login = () => {
    return (
        <LoginWrapper>
            <LoginContainer>
                <Title>Issue Tracker</Title>
                <GitLogin/>
            </LoginContainer>
        </LoginWrapper>
    );
}
const LoginContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;
const Title = styled.div`
text-align: center;
margin-bottom: 40px;
font-size: 60px;
`;
const LoginWrapper = styled.div`
width: 100%;
height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

export default Login;
