import { Link } from "react-router-dom";
import '../css/Midsection.css';
import React from 'react';
import Navbar from "../components/navbar";

function Dashboard(){


  /*async function onClick(e){
      localStorage.removeItem("JWT_PAYLOAD")
  }*/

return(
  <div><Navbar/>
<div className='hero2-container'>
<video  style={{"width" : 25 + '%', "height": 850}} autoPlay loop muted>
  <source src='/videos/homepage.mp4'  >
  </source></video>
      <h1>Home Page</h1>
      <p>
        <Link to='/employee'>Edit Users</Link>
      </p>
      <p>
        <Link to='/test'>Quiz Demo</Link>
      </p>
</div>
</div>
)};
export default Dashboard;