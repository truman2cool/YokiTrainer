import React from 'react';
import '../css/App.css';
import { Button, Button2 } from '../components/button';
import '../css/Midsection.css';

function Midsection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <h1>Yoki Staff</h1>
      <p>What are you waiting for? Get to work!</p>
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
          onClick={console.log('hey')}
        >
          Check us out
        </Button2>
      </div>
    </div>
  );
}

export default Midsection;