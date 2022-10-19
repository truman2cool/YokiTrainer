import { useAuthContext } from "../hooks/useAuthContext";
import { useState} from "react";

export const useSignup = () =>{

    const[error, setError] = useState(null);
    const[isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();

    const signup = async (username, email, fullname, password)=>{
       //make request, possible err so this will reset it from the start
        setIsLoading(true);
        setError(null);

        const response = await fetch("http://localhost:5000/employee/add", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, email, fullname, password})
        })
        
        const json = await response.json();

        if(!response.ok){
            setIsLoading(false);
            setError(json.error);
        }
        if(response.ok){
            // save user to local storage
            localStorage.setItem("user", JSON.stringify(json));

            // update the auth context
            dispatch({type: "LOGIN", payload: json});

            setIsLoading(false);
        }
    };

    return {signup, isLoading, error};
};