import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
//import "bootstrap/dist/css/bootstrap.css";

export default function Edit() {
 const [form, setForm] = useState({
   email: "",
   password: "",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5000/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const user = await response.json();
     if (!user) {
       window.alert(`User with id ${id} not found`);
       navigate("../Dashboard");
       return;
     }
 
     setForm(user);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedUser = {
     email: form.email,
     password: form.password,
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`/userUpdate/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedUser),
     headers: {
       'Content-Type': 'application/json'
     },
      }).then((res)=>{
        console.log(res);;
     }).catch(error => {
    window.alert(error);
    return;
  });
   navigate("../employee");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update User</h3>
     <form className="signup" onSubmit={onSubmit}>
       <label>Email:</label>
          <div>
          <input
              type = "text"
              id="email"
              placeholder='Enter an email'
              autoComplete="email"
              onChange={(e) => updateForm({email: e.target.value})}
              required
              />
          </div>
       <label>Password: </label>
       <div>
         <input
           type="password"
           id="password"
           className="form-control"
           placeholder="Enter new password"
           autoComplete="current-password"
           ng-hide="true"
           onChange={(e) => updateForm({ password: e.target.value })}
           required
         />
        </div>
       <br/>

       <div className="form-group">
         <input
           type="submit"
           value="Update User"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}