import React, { useEffect, useState } from 'react';
import './styles.css';
import Navigation from '../Navigation/Navigation';
import Console from '../Console/Console';
import { OneToTen } from '../../types/types'
import { GameLogic } from '../../cartridges/AbstractGameLogic';
import { KeyReader } from '../../functions/KeyReader';
import { cartridges } from '../../constants/games';
import { codesDescription } from '../../constants/gameCodes';


function CodeDescriptions({currentGame}: {currentGame: string}) {

  if (!codesDescription[currentGame]) return <></>
  return (
    <>
      <h3>Game codes for {currentGame}</h3>
      <b>NOTE: </b><i>Inserted code makes you a cheater</i>
      <ul>
        {
          codesDescription[currentGame].map(({code, description}) => 
            <li><b>{code}</b>: <i>{description}</i></li>)
        }
      </ul>
    </>
  )
}

function BrickGame() {
  // const [currentGame, setCurrentGame] = useState(cartridges.LAYERS);
  // const [currentGame, setCurrentGame] = useState(cartridges.ANIMATIONS);
  // const [currentGame, setCurrentGame] = useState(cartridges.MAZE);
  const [currentGame, setCurrentGame] = useState(cartridges.TETRIS);
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
            <div>
              <div><b>Up</b> <i>Go up</i></div>
              <div><b>Down</b> <i>Go down</i></div>
              <div><b>Left</b> <i>Go left</i></div>
              <div><b>Right</b> <i>Go right</i></div>
              <div><b>p</b> <i>Pause, unpause</i></div>
              <div><b>s</b> <i>Speed up</i></div>
              <div><b>l</b> <i>Level up</i></div>
              <div><b>Space</b> <i>Rotate</i></div>
              <div><b>Enter</b> <i>Start game, restart game after finished</i></div>
            </div>
            <CodeDescriptions currentGame={currentGame} />
        </div>
  );
}

export default BrickGame;
