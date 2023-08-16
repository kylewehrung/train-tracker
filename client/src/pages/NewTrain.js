import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { Button, Error, FormField, Input, Label} from "../styles";

function NewTrain() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        const body = {
            title: title,
            image_url: image,
            description: description,
        };
        fetch("/api/trains", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }).then((r) => {
            setIsLoading(false);
            if (r.ok) {
                history.push("/trains");
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

    

  return (
          <Wrapper>
            <WrapperChild>
              <Heading style={{ fontSize: "3rem", fontFamily: "cascadia", color: "#f8f0e3" }}>Add Train</Heading>
              <form onSubmit={handleSubmit}>
              <FormField>
            <Label htmlFor="title" style={{ color: "#f8f0e3", fontSize:"1.5em" }}>Title:</Label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="description" style={{ color: "#f8f0e3", fontSize:"1.5em" }}>Description:</Label>
            <Input
              type="text"
              id="description"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="image" style={{ color: "#f8f0e3", fontSize:"1.5em" }}>Image:</Label>
            <Input
              type="text"
              id="image"
              value={image}
              onChange={(e)=>setImage(e.target.value)}
            />
          </FormField>

          <FormField>
            <Button color="primary" type="submit">
              {isLoading ? "Loading..." : "Add Train"}
            </Button>
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
    top: 65%;
    left: 50%;
    transform: translate(-50%, -130%);
    width: 400px;
`;



const Heading = styled.h1`
  font-size: 3rem;
  font-family: cascadia;
  color: #f8f0e3;
  text-align: center; /* Center the heading text */
  margin-bottom: 20px; /* Add some space between the heading and the form */
`;



export default NewTrain;