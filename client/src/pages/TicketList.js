import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function TicketList() {
  const [tickets, setTickets] = useState([]);


  useEffect(() => {
    fetch("/api/tickets")
    .then((r) => r.json())
    .then(setTickets);
  }, []);


  function handleDeleteTicket(id) {
    fetch(`/api/tickets/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setTickets((tickets) =>
        tickets.filter((ticket) => ticket.id !== id)
        );
      }
    });
  }



  return (

    <Wrapper>
    <h1 style={{ fontSize: "2rem", fontFamily: "cascadia", color: "#f8f0e3" }}>Tickets</h1>
      {tickets.length > 0 ? (
        tickets.map((ticket) => (
          <Ticket key={ticket.id}>
            <Box>
              <h3>{"Ticket ID: "+ticket.id}</h3>
              <h3>{"Price: $"+ticket.price}</h3>
              <h3>{"Train: "+ticket.train.title}</h3>
              <h3>{"Train ID: "+ticket.train.id}</h3>
              <Image src={ticket.train.image_url}/>
              <h3>{"Passenger: "+ticket.user.username}</h3>
              <h3>{"User ID: "+ticket.user.id}</h3>
              <Image src={ticket.user.image_url} alt={`Passenger ${ticket.user.username}`} />
              <Button onClick={() => handleDeleteTicket(ticket.id)} style={{marginRight: "10px", backgroundColor: "black", color: "#f8f0e3"}}>
                Delete ticket
              </Button>
              <Button as={Link} to={`/update/${ticket.id}/edit`}>
          Update Ticket
        </Button>
             
              <ReactMarkdown>{ticket.description}</ReactMarkdown>
            </Box>
          </Ticket>
        ))
      ) : (
        <>
          <h3>No Tickets Found</h3>
          <Button as={Link} to="/new_ticket">
            Make a New Ticket
          </Button>
        </>
      )}
    </Wrapper>
  );
}





const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
  transform: translate(0, 4.5%);
`;

const Ticket = styled.article`
  margin-bottom: 24px;
  margin-right: 10px;
  box-shadow: 0 0 10px rgba(0,0,0, 0.2);
`;


const Image = styled.img`
    width: 250px;
    height: 200px;
    object-fit: cover;
`;




export default TicketList;