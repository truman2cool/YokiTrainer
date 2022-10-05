import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function Login() {

    const [user, setForm] = useState({
        email: "",
        password:"",
    })


    const navigate = useNavigate();

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
          return { ...prev, ...value };
        });
      }

    async function onSubmit(e){
        e.preventDefault()

       // When a post request is sent to the create url, we'll add a new record to the database.
   const newUser = { ...user };
 
   await fetch("http://localhost:5000/employee/add", {
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
 
   setForm({ email: "", password: ""});
   navigate("../context/employeeList");
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
                onChange={(e) => updateForm({email: e.target.value})}
                value={user.email}
                />
            </div>
            <label>Password:</label>
            <div>            
                <input
                type = "password"
                id="password"
                onChange={(e) => updateForm({password: e.target.value})}
                value={user.password}
                />
            </div>
            </form>
        <button>Log in</button>
        <div>            
            <label>Don't have an account?</label>
                <Link to="/signup"> Signup</Link>
            </div>
        </div>
    )
};