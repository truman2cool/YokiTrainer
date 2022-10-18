import React, {useState} from 'react';
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function Signup() {
  const [user, setUser] = useState({
    username:"",
    email: "",
    fullname:"",
    password:"",
  })
const navigate = useNavigate();

// These methods will update the state properties.
function updateUser(value) {
    return setUser((prev) => {
      return { ...prev, ...value };
    });
  }

 // This function will handle the submission.
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
              onChange={(e) => updateUser({username: e.target.value})}
              value={user.username}
              />
          </div>
          <label>Email:</label>
          <div>
          <input
              type = "email"
              id="email"
              onChange={(e) => updateUser({email: e.target.value})}
              value={user.email}
              />
          </div>
          <label>Full name:</label>
          <div>
          <input
              type = "fullname"
              id="fullname"
              onChange={(e) => updateUser({fullname: e.target.value})}
              value={user.fullname}
              />
          </div>
          <label>Password:</label>
          <div>            
              <input
              type = "password"
              id="password"
              onChange={(e) => updateUser({password: e.target.value})}
              value={user.password}
              />
          </div>
          <div className="form-group">
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
        </form>
  </div>
)
};