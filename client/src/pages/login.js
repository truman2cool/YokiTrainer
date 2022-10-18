import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function Login() {

  const [user, setUser] = useState({
    email: "",
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

       // When a post request is sent to the create url, we'll add a new record to the database.
   const newUser = { ...user };
 
   await fetch("http://localhost:5000/employee/:id", {
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
 
   setUser({ email: "", password: ""});
   navigate("/menu");
 }

 //display form
  return (
    <div>
        <h3>Log in</h3>
            <form className="login" onSubmit={onSubmit}>
            <label>Email:</label>
            <div>
            <input
                type = "email"
                id="email"
                onChange={(e) => updateUser({email: e.target.value})}
                value={user.email}
                required
                />
            </div>
            <label>Password:</label>
            <div>            
                <input
                type = "password"
                id="password"
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