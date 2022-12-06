import { Link } from "react-router-dom";
import '../css/Midsection.css';
import React from 'react';


function Dashboard(){


  async function onClick(e){
      localStorage.removeItem("JWT_PAYLOAD")
  }

return(
  <div>
<div className='hero2-container'>
<video  style={{"width" : 25 + '%', "height": 1000}} autoPlay loop muted>
  <source src='/videos/homepage.mp4'  >
  </source></video>
<h1>Home Page</h1>
      <p>
        <Link to="/createQuiz">Create Quiz</Link>
      </p>
      <p>
        <Link to='/employee'>Edit Users</Link>
      </p>
      <p>
        <Link to='/test'>Quiz Demo</Link>
      </p>
      <p>
        <Link to='/menu'>Menu</Link>
      </p>
      <p>
      <Link to ="/" onClick={onClick}>Logout</Link>
      </p>
</div>
</div>
)};
export default Dashboard;