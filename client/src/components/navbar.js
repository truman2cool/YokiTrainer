import React, { useState } from "react";
 
// We import bootstrap to make our application look better.
import "../css/navbar.css";
//import "bootstrap/dist/css/bootstrap.css";

 
// We import NavLink to utilize the react router.
import { Link, NavLink } from "react-router-dom";
//import {Button } from "./button";

// Here, we display our Navbar
export default function Navbar() {
  const [click, setClick] =useState(false);
  //const [button, setButton] =useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  /*const showButton = () =>{
    if (window.innerWidth<=960){
      setButton(false);
    }else{
      setButton(true);
    }
  };

  useEffect(()=>{
    showButton();
  },[]);*/

//window.addEventListener('resize', showButton);

return (
  <>
    <nav className='navbar'>
      <div className='navbar-container'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
        <NavLink className="navbar-brand" to="/">
       <img style={{"width" : 25 + '%'}} 
        src="/yokio.jpg"
        alt="Yoki Logo">    
       </img>
       </NavLink>
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/context/recordList'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Menu
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/create'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Create
            </Link>
          </li>
          <li>
            <Link
              to='/login'
              className='nav-links-mobile'
              onClick={closeMobileMenu}
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  </>
);
}
/*line below can go back the last </div>
{button && <Button buttonStyle='btn2--outline'>Login</Button>}*/