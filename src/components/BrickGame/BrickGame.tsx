import React, { useEffect, useState } from 'react';
import './styles.css';
import Navigation from '../Navigation/Navigation';
import Console from '../Console/Console';
import { OneToTen } from '../../types/types'
import { GameLogic } from '../../cartridges/AbstractGameLogic';
import { KeyReader } from '../../functions/KeyReader';
import { cartridges } from '../../constants/games';
import { codesDescription } from '../../constants/gameCodes';
import { keys, useKeyboard } from '../../hooks/useKeyboard';


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
  const c = [cartridges.MAZE, cartridges.TETRIS]
  const [currentGame, setCurrentGame] = useState(cartridges.TETRIS);
  const [speed, setSpeed]: [OneToTen, any] = useState(1);
  const [level, setLevel]: [OneToTen, any] = useState(1);
  const [isGameStarted, setIsGameStarted]: [boolean, (val:boolean)=>void] = useState(false);

  const cartridgeUp = () => {
    if (isGameStarted) return{};
    if (currentGame === cartridges.MAZE) {
      setCurrentGame(cartridges.TETRIS)
    } else {
      setCurrentGame(cartridges.MAZE)
    }
    return {}
  }

  useEffect(()=>{console.log(currentGame)}, [currentGame])
  
  useKeyboard({ key: keys.UP, callback: cartridgeUp })
  useKeyboard({ key: keys.DOWN, callback: cartridgeUp })

  // useEffect(() => {
  //   new KeyReader();
  // }, [])

    return (
        <div className="root">
            <Navigation />
            {isGameStarted ? 'Game is started' : 'Game is STOPPED'}
            <Console 
                currentGame={currentGame}
                speed = {speed}
                setSpeed = {setSpeed}
                level = {level}
                setLevel = {setLevel}
                setIsGameStarted = {setIsGameStarted}
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
