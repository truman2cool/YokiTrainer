import React, { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "./navbar";
 
export default function CreateTest() {
 const [testForm, setTestForm] = useState({
    question: "",
    keyA:"",
    keyB:"",
    keyC:"",
    keyD:"",
    correctKey:"",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setTestForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newQuestion = { ...testForm };
 
   await fetch("/test/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newQuestion),
   }).then((response)=> response.json())
   .then((testForm)=>{
    console.log(testForm);
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setTestForm({ 
    question: "",
    keyA:"",
    keyB:"",
    keyC:"",
    keyD:"",
    correctKey:""});
   navigate("../Test");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div><Navbar/>
     <h3>Create Item</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Question text: </label>
         <input
           type="text"
           className="form-control"
           id="question"
           value={testForm.question}
           required
           onChange={(e) => updateForm({ question: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="Answer A">Answer A test: </label>
         <input
           type="text"
           className="form-control"
           id="keyA"
           value={testForm.keyA}
           required
           onChange={(e) => updateForm({ keyA: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="Answer B">Answer B test: </label>
         <input
           type="text"
           className="form-control"
           id="keyB"
           value={testForm.keyB}
           required
           onChange={(e) => updateForm({ keyB: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="name">Answer C test: </label>
         <input
           type="text"
           className="form-control"
           id="keyC"
           value={testForm.keyC}
           onChange={(e) => updateForm({ keyC: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="name">Answer D test: </label>
         <input
           type="text"
           className="form-control"
           id="keyD"
           value={testForm.keyD}
           onChange={(e) => updateForm({ keyD: e.target.value })}
         />
       </div>
       <div className="form-group">
         <div className="form-check form-check-inline">
            <label htmlFor="correct answer">Select correct answer key: </label>
           <label htmlFor="answer is A" className="form-check-label">A</label>
           <input
             className="form-check-input"
             type="radio"
             name="correct key"
             id="correctKey"
             value={testForm.correctKey}
             checked={testForm.correctKey=== "keyA"}
             onChange={(e) => updateForm({ correctKey: e.target.value })}
           />
           <label htmlFor="answer is B" className="form-check-label">B</label>
           <input
             className="form-check-input"
             type="radio"
             name="correct key"
             id="correctKey"
             value={testForm.correctKey}
             checked={testForm.correctKey=== "keyB"}
             onChange={(e) => updateForm({ correctKey: e.target.value })}
           />
         </div>
         <label htmlFor="answer is C" className="form-check-label">C</label>
         <input
             className="form-check-input"
             type="radio"
             name="correct key"
             id="correctKey"
             value={testForm.correctKey}
             checked={testForm.correctKey=== "keyC"}
             onChange={(e) => updateForm({ correctKey: e.target.value })}
           />
           <label htmlFor="answer is D" className="form-check-label">D</label>
           <input
             className="form-check-input"
             type="radio"
             name="correct key"
             id="correctKey"
             value={testForm.correctKey}
             checked={testForm.correctKey=== "keyD"}
             onChange={(e) => updateForm({ correctKey: e.target.value })}
           />
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