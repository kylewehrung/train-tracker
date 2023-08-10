import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
// import ReactMarkdown from "react-markdown";
import { Button, Error, FormField, Input, Label} from "../styles";

function NewTicket({ user }) {
  const [price, setPrice] = useState("");
  const [trainId, setTrainId] = useState("");
  const [userId, setUserId] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    Promise.all([
      fetch(`/api/trains/${trainId}`).then((r) => r.json()),
      fetch(`/api/users/${userId}`).then((r) => r.json()),
    ])
      .then(([trainData, userData]) => {
        const body = {
          price: price,
          train_id: trainId,
          user_id: userId,
        };
        return fetch("/api/tickets", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
      })
      .then((r) => {
        setIsLoading(false);
        if (r.ok) {
          history.push("/tickets");
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      });
  }

  return (
    <Wrapper>
      <WrapperChild>
        <Heading>Create Ticket</Heading>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="price" style={{ color: "#f8f0e3", fontSize:"1.5em" }}>Price</Label>
            <Input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="trainId" style={{ color: "#f8f0e3", fontSize:"1.5em" }}>Existing Train ID</Label>
            <Input
              type="number"
              id="trainId"
              value={trainId}
              onChange={(e) => setTrainId(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="userId" style={{ color: "#f8f0e3", fontSize:"1.5em" }}>Existing User ID</Label>
            <Input
              type="number"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </FormField>
          <FormField>
            <StyledButton type="submit" isLoading={isLoading}>Submit Ticket</StyledButton>
          </FormField>
          <FormField>
            {errors.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </FormField>
        </form>
      </WrapperChild>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const WrapperChild = styled.div`
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -130%);
    width: 400px;
`;

const Heading = styled.h1`
  position: absolute;
  color: #f8f0e3;
  top: -50%;
  font-size: 3rem;
  font-family: 'cascadia';
  white-space: nowrap;
`;

const StyledButton = styled(Button)`
  ${({ isLoading }) => isLoading && `
    cursor: not-allowed;
    opacity: 0.7;
  `}
`;

export default NewTicket;