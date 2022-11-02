import { Link } from "react-router-dom";
import '../css/Midsection.css';
import Navbar from "../components/navbar";
import React from 'react';


function Dashboard(){

return(
  <div>
<Navbar />
<div className='hero2-container'>
<h1>This is the dashboard of The Website</h1>
      <p>
        <Link to="/signup">Signup</Link>
      </p>
      <p className='nav-item'>
        <Link to='/menu'>Menu</Link>
      </p>
      <p>
      <Link to ="/">Logout</Link>
      </p>
</div>
</div>
)};
export default Dashboard;