import React, { useEffect, useState } from 'react';
import './styles.css';
import Navigation from '../Navigation/Navigation';
import Console from '../Console/Console';
import { OneToTen } from '../../types/types'
import { GameLogic } from '../../cartridges/AbstractGameLogic';
import { cartridges } from '../../hooks/useCartridge'
import { KeyReader } from '../../functions/KeyReader';

function BrickGame() {
  // const [currentGame, setCurrentGame] = useState(cartridges.LAYERS);
  const [currentGame, setCurrentGame] = useState(cartridges.ANIMATIONS);
  const [speed, setSpeed]: [OneToTen, any] = useState(1);
  const [level, setLevel]: [OneToTen, any] = useState(1);

  useEffect(() => {
    new KeyReader();
  }, [])

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
