import React, {useState} from 'react';
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import {useSignup} from "../hooks/useSignup";
import "../css/form.css";

export default function Signup() {
  const [user, setUser] = useState({
    username:"",
    email: "",
    fullname:"",
    password:"",
  })
  const {signup, error, isLoading}= useSignup()

const navigate = useNavigate();

// These methods will update the state properties.
function updateUser(value) {
    return setUser((prev) => {
      return { ...prev, ...value }
    });
  }

 // This function will handle the submission.
async function onSubmit(e){
    e.preventDefault()
    await signup(user)
// When a post request is sent to the create url, we'll add a new record to the database.
const newUser = { ...user };

 await fetch("http://localhost:5000/employee/add", {
 method: "POST",
 headers: {
   "Content-Type": "application/json",
 },
 body: JSON.stringify(newUser),
}).then((response)=> response.json())
.then((user)=>{
 console.log(user);
})
.catch(error => {
 window.alert(error);
 return;
});

setUser({username:"", email: "", fullname:"", password:""});
navigate("/login");
}

//display form
return (
  <div>
      <h3>Sign up</h3>
        <form className="signup" onSubmit={onSubmit}>
        <label>Username:</label>
          <div>
          <input
              type = "username"
              id="username"
              placeholder='Enter username'
              onChange={(e) => updateUser({username: e.target.value})}
              value={user.username}
              required
              />
          </div>
          <label>Email:</label>
          <div>
          <input
              type = "email"
              id="email"
              placeholder='Enter an email'
              autoComplete="email"
              onChange={(e) => updateUser({email: e.target.value})}
              value={user.email}
              required
              />
          </div>
          <label>Full name:</label>
          <div>
          <input
              type = "fullname"
              id="fullname"
              placeholder='Enter full name'
              onChange={(e) => updateUser({fullname: e.target.value})}
              value={user.fullname}
              required
              />
          </div>
          <label>Password:</label>
          <div>            
              <input
              type = "password"
              id="password"
              placeholder="Enter a password"
              autoComplete="current-password"
              ng-hide="true"
              onChange={(e) => updateUser({password: e.target.value})}
              value={user.password}
              required
              />
          </div>
          <div disabled={isLoading} className="form-group">
            <input
              type = "submit"
              value= "Sign up"
              className="btn btn-primary"
            />
          </div>
          <div>            
            <label>Already have an account?</label>
                <Link to="/login"> Login</Link>
            </div>
            {error && <div className="error">{error}</div>}
        </form>
  </div>
)
};