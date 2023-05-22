import { useState } from 'react';
import './styles.css';
import Navigation from '../Navigation/Navigation';
import Console from '../Console/Console';
import { OneToTen } from '../../types/types'
import { codesDescription } from '../../constants/gameCodes';
import { keys, useKeyboard } from '../../hooks/useKeyboard';
import { useSetCartridge } from './useSetCartridge';


function CodeDescriptions({currentGame}: {currentGame: string}) {

  if (!codesDescription[currentGame]) return <></>
  return (
    <>
      <h3>Game codes for {currentGame}</h3>
      <b>NOTE: </b><i>Inserted code makes you a cheater</i>
      <ul>
        {
          codesDescription[currentGame].map(({code, description}) => 
            <li key={`${currentGame}${code}${description}`}><b>{code}</b>: <i>{description}</i></li>)
        }
      </ul>
    </>
  )
}


function BrickGame() {
  const [speed, setSpeed]: [OneToTen, any] = useState(1);
  const [level, setLevel]: [OneToTen, any] = useState(1);
  const {
    cartridgeDown,
    cartridgeUp,
    currentGame,
    isGameSelectionAllowed,
    setIsGameSelectionAllowed,
  } = useSetCartridge();
  
  useKeyboard({ key: keys.UP, callback: cartridgeUp })
  useKeyboard({ key: keys.DOWN, callback: cartridgeDown })

    return (
        <div className="root">
            <Navigation />
            {isGameSelectionAllowed ? 'Game is started' : 'Game is STOPPED'}
            <Console 
                currentGame={currentGame}
                speed = {speed}
                setSpeed = {setSpeed}
                level = {level}
                setLevel = {setLevel}
                setIsGameSelectionAllowed = {setIsGameSelectionAllowed}
            />
            <div>
              <div><b>Up</b> <i>Go up</i></div>
              <div><b>Down</b> <i>Go down</i></div>
              <div><b>Left</b> <i>Go left</i></div>
              <div><b>Right</b> <i>Go right</i></div>
              <div><b>p</b> <i>Pause, unpause</i></div>
              <div><b>s</b> <i>Speed up</i></div>
              <div><b>l</b> <i>Level up</i></div>
              <div><b>x</b> <i>Reset console</i></div>
              <div><b>Space</b> <i>Rotate</i></div>
              <div><b>Enter</b> <i>Start game, restart game after finished</i></div>
            </div>
            <CodeDescriptions currentGame={currentGame} />
        </div>
  );
}

export default BrickGame;
