import React from 'react';
import '../css/App.css';
import { Button, Button2 } from '../components/button';
import '../css/Midsection.css';

function Midsection() {
  return (
    <div className='hero-container'>
      
      <video src='/videos/sushiboat.mp4' autoPlay loop muted />
      <h1>Welcome</h1>
      
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
        <Button2
          className='btn'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          //onClick={console.log('hey')}
        >
          Check us out
        </Button2>
      </div>
    </div>
  );
}

export default Midsection;