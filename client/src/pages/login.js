import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
//import useAuth from "../hooks/useAuth";
import Navbar from "../components/navbar";
import axios from "axios";
//const LOGIN_URL = '/auth';

export default function Login() {
  //const location = useLocation();

  const [user, setUser] = useState({
    username: "",
    password:"",
  })
  axios.defaults.withCredentials = true
const navigate = useNavigate();

// These methods will update the state properties.
function updateUser(value) {
    return setUser((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e){
      e.preventDefault()
      
      /*When a post request is sent to the login url, 
        we'll add a user to the database.*/
      const newUser = { ...user };
    await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
       "Content-Type": "application/json",
      },
        credentials: 'include',
        body: JSON.stringify(newUser),
    }).then((response)=> response.json())
        .then((user)=>{
        console.log(user);
        
    })
        .catch(error => {
        window.alert(error);
        return;
    });
  setUser({ username: "", password: ""});
  navigate("/Dashboard")
 }
 //display form
  return (
    <div><Navbar/>
        <h3><strong>Log in</strong></h3>
            <form className="login" onSubmit={onSubmit}>
            <label>Username:</label>
            <div>
            <input
                type = "text"
                id="username"
                placeholder="username"
                name="username"
                autoComplete="on"
                onChange={(e) => updateUser({username: e.target.value})}
                value={user.username}
                required
                />
            </div>
            <label>Password:</label>
            <div>            
                <input
                type = "password"
                id="password"
                placeholder="Enter you Password"
                autoComplete="on"
                ng-hide="true"
                onChange={(e) => updateUser({password: e.target.value})}
                value={user.password}
                required
                />
            </div>
            <div className="form-group">
            <input
              type = "submit"
              value= "Log in"
              className="btn btn-primary"
              //onClick={handleLogin}
            />
          </div>
            </form>
        <div>            
            <label>Don't have an account?</label>
                <Link to="/signup"> Sign up</Link>
            </div>
        </div>
    )
};