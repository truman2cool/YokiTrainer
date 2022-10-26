import React, { Component } from "react";
import { Navigate, Redirect, Route } from "react-router-dom";
import loggedIn from "../pages/login";

const PublicRoute =({component: Component, restricted, ...rest})=>{
  return(
    <Route {...rest} render={props=>(
      loggedIn && restricted?
        <Navigate to="/home"/>
        : <Component {...props} />
    )}/>
  );
};

export default PublicRoute;