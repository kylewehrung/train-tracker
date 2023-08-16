import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

const TrainList = () => {
    const [trains, setTrains] = useState([]);

    useEffect(() => {
        fetch("/api/trains")
        .then((r) => r.json())
        .then(setTrains);
    }, []);


    function handleDeleteTrain(id) {
        fetch(`/api/trains/${id}`, {
            method: "DELETE",
        }).then((r) => {
            if (r.ok) {
                setTrains((trains) =>
                trains.filter((train) => train.id !== id)
                );
            }
        });
    }

    return (
        <Wrapper>
        <h1 style={{ fontSize: "2rem", fontFamily: "cascadia", color: "#f8f0e3", textAlign: "center" }}>Trains</h1>
            {trains.length > 0 ? (
                trains.map((train) => (
                    <Train key={train.id}>
                        <Box>
                            <h3>{"Train Number: "+train.id}</h3>
                            <h3>{"Name: "+train.title}</h3>
                            <h3>{train.description}</h3>
                            <Image src={train.image_url}/>
                            <div>
                            <Button onClick={() => handleDeleteTrain(train.id)}
                             style={{  marginTop: "15px", backgroundColor: "black", color: "#f8f0e3" }}
                            >
                                Delete train
                            </Button>
                            </div>
                        </Box>
                    </Train>
                ))
            ) : (
                    <>
                    <h3>No Trains Found</h3>
                    <Button as={Link} to="/new_train">
                        Make a New Train
                    </Button>
                    </>
                )}
        </Wrapper>
    );
}


const Wrapper = styled.section`
    width: 750px;
    margin: 40px auto;
`;



const Train = styled.article`
    margin-bottom: 24px;

`;

const Image = styled.img`
  width: 350px;
  height: 300px;
  object-fit: cover;
  transition: transform 0.2s; 

&:hover {
  transform: scale(1.1); 
}
`;

export default TrainList