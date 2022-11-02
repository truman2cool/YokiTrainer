import React from 'react';
import '../css/App.css';
//import Header from './header';
import Footer from './footer';
import Midsection from './Midsection';
import Navbar from '../components/navbar';
//import { Link } from "react-router-dom";

function Home() {

  return (
    <div className='Home'>
      <Navbar />
        <Midsection />
        <footer>
          <Footer />
        </footer>
      </div>


  );
}

export default Home;