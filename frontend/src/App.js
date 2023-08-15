import './App.css';
import React from 'react';
import {useState, useEffect } from 'react';
import axios from 'axios';
import { Container, AppBar, Button, TextField, Typography, Toolbar} from '@mui/material';
import Sidebar from './components/sidebar';
import { UserProvider } from './UserContext';
import SignIn from './components/SignIn';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
//using false because localhost test
axios.defaults.withCredentials = true;


export const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  useEffect(() => {
    client.get("/api/user")
    .then(function(res) {
      setCurrentUser(true);
    })
    .catch(function(error) {
      setCurrentUser(false);
    });
  }, []);


  function update_form_btn() {
    if (registrationToggle) {
      document.getElementById("form_btn").innerHTML = "Register";
      setRegistrationToggle(false)
    } else {
      document.getElementById("form_btn").innerHTML = "Log in";
      setRegistrationToggle(true)
    }
  }

  function submitLogout(e) {
    e.preventDefault();
    client.post(
      "/api/logout/",
      {withCredentials: true}
    ).then(function(res) {
      setCurrentUser(false);
    });
  }

  if (currentUser) {
    return (
      <div>
    <AppBar position="static" color="primary">
        <Container maxWidth="lg">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    
                </Typography>
                <form onSubmit={submitLogout}>
                    <Button variant="outlined" type='submit' color="inherit">
                        Log out
                    </Button>
                </form>
            </Toolbar>
        </Container>
    </AppBar>
    <Container style={{ padding: 0 }}>
        <div className="center">
            <Typography variant="h5"></Typography>
        </div>
    </Container>
    <Sidebar username={email} />
</div>



    );
  }

  return (
    <div>
    <UserProvider>
    <SignIn onSuccessfulLogin={(userEmail) => {
   setCurrentUser(true);
   setEmail(userEmail);
}} />

      </UserProvider>
    </div>
    
  );
}

export default App;
