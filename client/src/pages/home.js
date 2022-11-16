import React from 'react';
import '../css/App.css';
import Midsection from './Midsection';
import Navbar from '../components/navbar';

function Home() {

  return (
    <div className='Home'>
      <Navbar />
        <Midsection />
      </div>


  );
}

export default Home;