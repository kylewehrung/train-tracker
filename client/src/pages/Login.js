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
          <CustomContainer>
          <CustomLabel>
            Don't have an account? &nbsp;
          </CustomLabel>
            <Button color="secondary" onClick={() => setShowLogin(false)}>
              Sign Up
            </Button>
            </CustomContainer>
        </>
      ) : (
        <>
          <SignUpForm onLogin={onLogin} />
          <Divider />
          <CustomContainer>
          <CustomLabel>
            Already have an account? &nbsp;
          </CustomLabel>
            <Button color="secondary" onClick={() => setShowLogin(true)}>
              Log In
            </Button>
            </CustomContainer>
        </>
      )}
    </Wrapper>
  );
}

const Logo = styled.h1`
  font-family: "cascadia";
  font-size: 3.5rem;
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
    width: 480px;
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


const CustomContainer = styled.div`
  display: flex;
  align-items: center; /* Vertically align items */
`;



const CustomLabel = styled.label`
  color: black;
  background-image: linear-gradient(rgba(225, 185, 185, 0.75), rgba(225, 255, 255, 0.9));
  background-size: 240% auto; /* Adjust the width */
  background-origin: border-box; /* Apply gradient within the border box */
  border-radius: 10px; /* Adjust the corner radius */
  padding: 10px; /* Add padding for better appearance */
  font-size: 1.2em;
  font-family: cascadia;
`;




export default Login;