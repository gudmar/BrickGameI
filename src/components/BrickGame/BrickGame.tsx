import React, { useState } from 'react';
import './styles.css';
import Navigation from '../Navigation/Navigation';
import Console from '../Console/Console';
import { ALL_CARTRIDGES } from '../../cartridges/allCartridges';
import { OneToTen } from '../../types/types'
import { GameLogic } from '../../cartridges/AbstractGameLogic';

function BrickGame() {
  const [currentGame, setCurrentGame] = useState(ALL_CARTRIDGES.testCartridge);
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
