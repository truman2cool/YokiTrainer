import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
   name: "",
   description: "",
   category: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newItem = { ...form };
 
   await fetch("http://localhost:5000/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newItem),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ name: "", description: "", category: "" });
   navigate("../context/recordList");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create Item</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Item name</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="description">Description</label>
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
         </div>         
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="category"
             id="categorySushi"
             value="Sushi"
             checked={form.category === "Sushi"}
             onChange={(e) => updateForm({ category: e.target.value })}
           />
           <label htmlFor="sushi" className="form-check-label">Sushi</label>
         </div>     
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="category"
             id="categoryEntrées"
             value="Entrées"
             checked={form.category === "Entrées"}
             onChange={(e) => updateForm({ category: e.target.value })}
           />
           <label htmlFor="Entrées" className="form-check-label">Entrées</label>
         </div>  
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="category"
             id="categoryRamen"
             value="Ramen"
             checked={form.category === "Ramen"}
             onChange={(e) => updateForm({ category: e.target.value })}
           />
           <label htmlFor="Ramen" className="form-check-label">Ramen</label>
         </div>            
         <div className="form-check form-check-inline">
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
       <div className="form-group">
         <input
           type="submit"
           value="Create item"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}