import React, { useState } from 'react';
import './styles.css';
import Navigation from '../Navigation/Navigation';
import Console from '../Console/Console';
import { OneToTen } from '../../types/types'
import { GameLogic } from '../../cartridges/AbstractGameLogic';
import { cartridges } from '../../hooks/useCartridge'

function BrickGame() {
  const [currentGame, setCurrentGame] = useState(cartridges.LAYERS);
  const [speed, setSpeed]: [OneToTen, any] = useState(0);
  const [level, setLevel]: [OneToTen, any] = useState(0);
    return (
        <div className="root">
            <Navigation />
            <Console 
                currentGame={currentGame}
                speed = {speed}
                setSpeed = {setSpeed}
                level = {level}
                setLevel = {setLevel}
            />
        </div>
  );
}

export default BrickGame;
