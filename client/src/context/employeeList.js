import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

const Employee = (props) => (
 <tr>
  <td>{props.employee.username}</td>
   <td>
     <Link className="btn btn-link" to={`/UserEdit/${props.employee._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteEmployee(props.employee._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
export default function EmployeeList() {
 const [employees, setEmployee] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getEmployee() {
     const response = await fetch(`http://localhost:5000/employee/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const employees = await response.json();
     setEmployee(employees);
   }
 
   getEmployee();
 
   return;
 }, [employees.length]);
 
 // This method will delete a record
 async function deleteEmployee(id) {
   await fetch(`http://localhost:5000/userDeletion/${id}`, {
     method: "DELETE"
   });
 
   const newEmployees = employees.filter((el) => el._id !== id);
   setEmployee(newEmployees);
 }
 
 // This method will map out the records on the table
 function employeeList() {
   return employees.map((employee) => {
     return (
       <Employee
         employee={employee}
         deleteEmployee={() => deleteEmployee(employee._id)}
         key={employee._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div>
    <Navbar/>
     <h3>User Info</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Username</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{employeeList()}</tbody>
     </table>
   </div>
 );
}