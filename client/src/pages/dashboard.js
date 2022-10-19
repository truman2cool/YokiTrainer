import React from 'react';
import { Link } from "react-router-dom";
import '../css/Midsection.css';

function dashboard(){
return(
<div className='hero2-container'>
<h1>This is the dashboard of The Website</h1>
      <p>
        <Link to="/signup">Signup</Link>
      </p>
      <p className='nav-item'>
        <Link to='/menu'>Menu</Link>
      </p>
      <p>
      <Link to="/logout">Logout</Link>
      </p>
</div>
)};
export default dashboard;