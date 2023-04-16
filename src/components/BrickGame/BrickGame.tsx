import { useEffect, useState } from 'react';
import './styles.css';
import Navigation from '../Navigation/Navigation';
import Console from '../Console/Console';
import { OneToTen } from '../../types/types'
import { codesDescription } from '../../constants/gameCodes';
import { keys, useKeyboard } from '../../hooks/useKeyboard';
import { findLastIndex } from '../../functions/findLastIndex';
import { CARTRIDGE_ORDER } from '../../constants/cartridgeLibrary';


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
  const [currentGame, setCurrentGame] = useState(CARTRIDGE_ORDER[1]);
  const [speed, setSpeed]: [OneToTen, any] = useState(1);
  const [level, setLevel]: [OneToTen, any] = useState(1);
  const [isGameSelectionAllowed, setIsGameSelectionAllowed]: [boolean, (val:boolean)=>void] = useState(false);

  const cartridgeUp = () => {
    if (!isGameSelectionAllowed) return{};
    const findCurrentCartridgeIndex = () => CARTRIDGE_ORDER.findIndex((storedCartridge) => storedCartridge === currentGame)
    const setNextCartridge = () => {
      const currentIndex = findCurrentCartridgeIndex();
      const nextIndex =  currentIndex + 1 >= CARTRIDGE_ORDER.length ? 0 : currentIndex + 1;
      setCurrentGame(CARTRIDGE_ORDER[nextIndex])
    }
    setNextCartridge()    
  }
  
  useKeyboard({ key: keys.UP, callback: cartridgeUp })
  useKeyboard({ key: keys.DOWN, callback: cartridgeUp })

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
