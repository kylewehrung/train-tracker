import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function UserList() {
  const [users, setUsers] = useState([]);
  const [targetUserId, setTargetUserId] = useState(null);
  const scrollToUserRef = useRef(null);

  
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.startsWith("#user-")) {
      const userId = parseInt(hash.substring(6), 10);
      setTargetUserId(userId);
    }
  }, []);




  useEffect(() => {
    fetch("/api/users")
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
      })
      .then((users) => {
        setUsers(users);
  
        // If there's a target user, scroll to it
        if (targetUserId !== null && scrollToUserRef.current) {
          scrollToUserRef.current.scrollIntoView({ behavior: "smooth" });
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [targetUserId]);



    return (
        <Wrapper>
        <h1 style={{ fontSize: "2rem", fontFamily: "cascadia", color: "#f8f0e3", textAlign: "center" }}>Users</h1>
            {users.length > 0 ? (
                users.map((user) => (
                    <User key={user.id} ref={user.id === targetUserId ? scrollToUserRef : null}>
                    <Box>
                    <h3>{"Passenger Number: "+user.id}</h3>
                    <h3>{"Name: "+user.username}</h3>
                    <Image src={user.image_url}/>
                    <h3>{"Bio: "+user.bio}</h3>
                    </Box>
                </User>
                ))
            ) : (
                <>
                <h3>No Users Found</h3>
                <Button as={Link} to="/tickets">
                    Go home
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
const User = styled.article`
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


export default UserList;