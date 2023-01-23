import React from 'react';
import './styles.css';
import Navigation from '../Navigation/Navigation';
import Console from '../Console/Console';

function BrickGame() {
  
    return (
        <div className="root">
            <Navigation />
            <Console />
            {/* <div className="console-container">
                <Console />
            </div> */}
        </div>
  );
}

export default BrickGame;
