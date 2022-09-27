import { useEffect } from "react";

const attempt = 5; //attempts given to try and login

//we need username and pw
const username = " ";
const password = " ";
useEffect(()=>
    async function getRecords(){
        const response = await fetch(`http://localhost:5000/record/`);
 
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
    
        const records = await response.json();
        setRecords(records);
      }
    
)

if (username && password == something){
    alert("Login Successful");
    window.location = "App.js"
    return false;
}
else{
    attempt--;//decrememt attempts
}
//attempt blocked off
if(attempt == 0){
    document.getElementById("username").disable = true;
    document.getElementById("password").disable = true;
    document.getElementById("submit").disable = true;
    return false;
}