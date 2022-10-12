import React from 'react';
import '../css/App.css';
//import Header from './header';
import Footer from './footer';
import Midsection from './Midsection';

function Home() {

  return (
    <div className='Home'>   
        <Midsection /> 
      <footer>
          <Footer />
    </footer>    
    </div>


  );
}

export default Home;