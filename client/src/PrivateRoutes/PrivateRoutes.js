//import axios from "axios";
import { Outlet, Navigate } from "react-router-dom";
import { useLocalState } from "../store/useLocalStorage";

const PrivateRoutes = () =>{

    const [jwt, setJwt]= useLocalState("","JWT_PAYLOAD");


    //let auth = {'auth':true}
    return(
        jwt ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes;