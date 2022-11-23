import axios from "axios";
import { Outlet, Navigate } from "react-router-dom";
import { useLocalState } from "../store/useLocalStorage";

const PrivateRoutes = () =>{

    const [jwt, setJwt]= useLocalState("","jwt");


    //let auth = {'auth':true}
    return(
        jwt ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes;