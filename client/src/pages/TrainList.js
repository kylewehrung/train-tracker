import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function TrainList() {  
    const [trains, setTrains] = useState([]);
    const [targetTrainId, setTargetTrainId] = useState(null);
    const scrollToTrainRef = useRef(null);
  

    useEffect(() => {
        const hash = window.location.hash;
        if (hash && hash.startsWith("#train-")) {
          const trainIdString = hash.substring(7); // Remove the "#train-" prefix
          console.log("Extracted Train ID String:", trainIdString);
        
          if (/^\d+$/.test(trainIdString)) {
            const trainId = parseInt(trainIdString, 10);
            console.log("Parsed Train ID:", trainId);
            setTargetTrainId(trainId)
          } else {
            console.log("Invalid Train ID String:", trainIdString);
          }
        }
        
        
        
}, []);




useEffect(() => {
      fetch("/api/trains")
      .then((r) => {
          if (r.ok) {
              return r.json();
            }
        })
        .then((trains) => {
            setTrains(trains);
            
            // If there's a target train, scroll to it
            if (targetTrainId !== null && scrollToTrainRef.current) {
                scrollToTrainRef.current.scrollIntoView({ behavior: "smooth" });
          }
        })
        .catch((error) => {
          console.error("Error fetching trains:", error);
        });
    }, [targetTrainId]);



    function handleDeleteTrain(id) {
        const confirmDelete = window.confirm("Are you sure you want to delete this train?");
        
        if (confirmDelete) {
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
    }



    return (
        <Wrapper>
        <h1 style={{ fontSize: "2rem", fontFamily: "cascadia", color: "#f8f0e3", textAlign: "center" }}>Trains</h1>
            {trains.length > 0 ? (
                trains.map((train) => (
                    <Train key={train.id} ref={train.id === targetTrainId ? scrollToTrainRef : null}>
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