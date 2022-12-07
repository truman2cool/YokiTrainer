import React, {useState} from 'react';
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "../css/form.css";
import axios from 'axios';

export default function Signup() {
  const [user, setUser] = useState({
    username:"",
    email: "",
    fullname:"",
    password:"",
  })
  //const {signup, error, isLoading}= useSignup()

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
    //await signup(user)
// When a post request is sent to the create url, we'll add a new record to the database.
const newUser = { ...user };

 /*await fetch("/signup", {
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
});*/

await axios.post("/signup",newUser,{
  headers:{"Content-Type": "application/json"},
}).then((user)=>{
  console.log(user);
}).catch(error => {
  window.alert(error);
  return;
});

setUser({username:"", email: "", fullname:"", password:""});
navigate("/login");
}

//display form
return (
  <div><Link to="/" className='navbar-logo' >
  <img style={{"width" : 10+ '%'}} 
   src="/yokio.jpg"
   alt="Yoki Logo">    
  </img>
   </Link>
   <div className="yokibar">
        <img src="/images/YokiBar3.jpg" alt="Yoki Logo"></img>
       </div>
      <h3>Sign up</h3>
        <form className="signup" onSubmit={onSubmit}>
        <label>Username:</label>
          <div>
          <input
              type = "text"
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
              type = "text"
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
              type = "text"
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