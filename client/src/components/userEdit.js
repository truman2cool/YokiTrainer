import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
//import "bootstrap/dist/css/bootstrap.css";

export default function Edit() {
 const [form, setForm] = useState({
   username: "",
   email: "",
   fullname:"",
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
   const editedItem = {
     username: form.username,
     email: form.email,
     fullname: form.fullname,
     password: form.password,
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`/userUpdate/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedItem),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("../Dashboard");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Item</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Username: </label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.username}
           onChange={(e) => updateForm({ username: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="description">Email: </label>
         <input
           type="text"
           className="form-control"
           id="description"
           value={form.email}
           onChange={(e) => updateForm({ email: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="description">Fullname: </label>
         <input
           type="text"
           className="form-control"
           id="description"
           value={form.fullname}
           onChange={(e) => updateForm({ fullname: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="description">Password: </label>
         <input
           type="text"
           className="form-control"
           id="description"
           value={form.password}
           onChange={(e) => updateForm({ password: e.target.value })}
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