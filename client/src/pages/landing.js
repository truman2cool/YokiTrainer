import React from 'react';
import { Link } from "react-router-dom";

function landing(){

return(
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Landing | Node Auth</title>
    <style>
      <nav>display: flex;</nav>
      <li> 
        list-style: none;
        margin: 1rem;
      </li>
      <nav><li>
        color: #000;
        padding: 1rem;
        text-decoration: none;
        background: coral;
        </li></nav>
    </style>
  </head>
  <body>
    <ul class="nav">
      <li>
      <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/signup">Signup</Link>
      </li>
    </ul>
    <h3>This is the Landing Page of The Website</h3>
  </body>
</html>
)};
export default landing;