import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
//import "bootstrap/dist/css/bootstrap.css";

export default function Edit() {
 const [form, setForm] = useState({
   name: "",
   description: "",
   category: "",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("../menu");
       return;
     }
 
     setForm(record);
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
     name: form.name,
     description: form.description,
     category: form.category,
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedItem),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("../menu");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Item</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name: </label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="description">Description: </label>
         <input
           type="text"
           className="form-control"
           id="description"
           value={form.description}
           onChange={(e) => updateForm({ description: e.target.value })}
         />
       </div>
       <div className="form-group">
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="category"
             id="categoryTapas"
             value="Tapas"
             checked={form.category === "Tapas"}
             onChange={(e) => updateForm({ category: e.target.value })}
           />
           <label htmlFor="tapas" className="form-check-label">Tapas</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="category"
             id="categoryMaki"
             value="Maki"
             checked={form.category === "Maki"}
             onChange={(e) => updateForm({ category: e.target.value })}
           />
           <label htmlFor="sushi" className="form-check-label">Maki</label>
         </div>         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="category"
             id="categorySushi"
             value="Sushi"
             checked={form.category === "Sushi"}
             onChange={(e) => updateForm({ category: e.target.value })}
           />
           <label htmlFor="cocktail" className="form-check-label">Sushi</label>
         </div>         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="category"
             id="categoryCocktail"
             value="Cocktail"
             checked={form.category === "Cocktail"}
             onChange={(e) => updateForm({ category: e.target.value })}
           />
           <label htmlFor="categoryDrink" className="form-check-label">Cocktail</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="category"
             id="categoryDrink"
             value="Martini"
             checked={form.category === "Martini"}
             onChange={(e) => updateForm({ category: e.target.value })}
           />
           <label htmlFor="martini" className="form-check-label">Martini</label>
         </div>
       </div>
       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="Update Record"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}