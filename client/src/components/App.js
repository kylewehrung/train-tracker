import React, { useEffect, useState } from "react";
import { UserContext } from "./context";
import { Switch, Route, useHistory } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import TicketList from "../pages/TicketList";
import NewTicket from "../pages/NewTicket";
import UpdateTicket from "../pages/UpdateTicket";
import UserList from "../pages/UserList";
import TrainList from "../pages/TrainList";
import NewTrain from "../pages/NewTrain";
import styled from "styled-components";


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
    <UserContext.Provider value={{ user, setUser }}>
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
      </UserContext.Provider>
    </AppWrapper>
  );
}

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url("https://www.wallpaperflare.com/static/962/763/777/flower-starry-night-night-time-poppy-wallpaper.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  height: 100%;
  width: 100vw;
  background-attachment: fixed;
`;

const AppWrapper = styled.div`
  height: 100%;
  background-image: url("https://www.wallpaperflare.com/static/962/763/777/flower-starry-night-night-time-poppy-wallpaper.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  opacity: 0.9;
`;

export default App;