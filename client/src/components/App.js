import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import TicketList from "../pages/TicketList";
import NewTicket from "../pages/NewTicket";
import UpdateTicket from "../pages/UpdateTicket";
import UserList from "../pages/UserList";
import TrainList from "../pages/TrainList";
import NewTrain from "../pages/NewTrain";
import styled, { keyframes } from "styled-components";


function App() {
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetch("/api/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  const handleLogin = (user) => {
    setUser(user);
    history.push('/tickets');
  };

  if (!user) return <Login onLogin={handleLogin} />;

  return (
    <AppWrapper>
      <NavBar user={user} setUser={setUser} />
      <MainContainer>
        <Switch>
          <Route path="/users">
            <UserList user={user}/>
          </Route>
          <Route path="/trains">
            <TrainList/>
          </Route>
          <Route path="/new_train">
            <NewTrain/>
          </Route>
          <Route path="/new_ticket">
            <NewTicket user={user} />
          </Route>
          <Route path="/update/:id/edit">
            <UpdateTicket user={user}/>
          </Route>
          <Route path="/tickets">
            <TicketList />
          </Route>
        </Switch>
      </MainContainer>
    </AppWrapper>
  );
}
const animation = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 100%;
  }
`;
const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url("https://i.pinimg.com/originals/c8/67/80/c86780dc650d1c20befc59a90011b6b1.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  height: 100%;
  width: 50vw;
  animation: ${animation} 20s linear infinite;
  background-attachment: fixed;
`;

const AppWrapper = styled.div`
  height: 100%;
  background-image: url("https://i.pinimg.com/originals/c8/67/80/c86780dc650d1c20befc59a90011b6b1.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  opacity: 0.9;
`;

export default App;