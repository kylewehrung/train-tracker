import { useState } from "react";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import { Button } from "../styles";


function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Wrapper>
      <Logo>Train Tracker</Logo>
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} />
          <Divider />
          <p>
            Don't have an account? &nbsp;
            <Button color="secondary" onClick={() => setShowLogin(false)}>
              Sign Up
            </Button>
          </p>
        </>
      ) : (
        <>
          <SignUpForm onLogin={onLogin} />
          <Divider />
          <p>
            Already have an account? &nbsp;
            <Button color="secondary" onClick={() => setShowLogin(true)}>
              Log In
            </Button>
          </p>
        </>
      )}
    </Wrapper>
  );
}

const Logo = styled.h1`
  font-family: "cascadia";
  font-size: 3rem;
  color: black;
  margin: 0;
`;

const Wrapper = styled.section`
  height: 100vh;
  background-image: url("https://www.freightrailreform.com/wp-content/uploads/2015/12/White-Train-Locomotive-cropped.jpg");
  background-repeat: no-repeat;
  background-size: cover; 
  background-position: center; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0.9;
  overflow: hidden; /

  & > form {
    position: relative;
    width: 400px;
    margin-top: 30px;
  }

  & > p {
    color: black; 
  }
`;

const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #ccc;
  margin: 16px 0;
`;

export default Login;