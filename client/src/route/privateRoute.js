import React, { Component } from "react";
import { Navigate, Redirect, Route } from "react-router-dom";
import loggedIn from "../pages/login";

const PrivateRoute =({component: Component, restricted, ...rest})=>{
  return(
    <Route {...rest} render={props=>(
      loggedIn?
       <Component {...props} />
       :<Navigate to="/dashboard"/>
    )}/>
  );
};

export default PrivateRoute;