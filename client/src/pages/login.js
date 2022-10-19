import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
export default function Login() {

  const [user, setUser] = useState({
    username: "",
    password:"",
})
const navigate = useNavigate();

// These methods will update the state properties.
function updateUser(value) {
    return setUser((prev) => {
      return { ...prev, ...value };
    });
  }

    async function onSubmit(e){
        e.preventDefault()
        console.log(user);
      // When a post request is sent to the create url, we'll add a new record to the database.
      const newUser = { ...user };
 
   await fetch("http://localhost:5000/employee/login", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newUser),
   })
   .catch(error => {
     window.alert(error);
     return;
   });

   setUser({ username: "", password: ""});
   navigate("/menu");
 }

 //display form
  return (
    <div>
        <h3><strong>Log in</strong></h3>
            <form className="login" onSubmit={onSubmit}>
            <label>Username:</label>
            <div>
            <input
                type = "username"
                id="username"
                placeholder="username"
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