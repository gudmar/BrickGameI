import './styles.css';
import Navigation from '../Navigation/Navigation';
import Console from '../Console/Console';
import { codesDescription } from '../../constants/gameCodes';
import { keys, useKeyboard } from '../../hooks/useKeyboard';
import { useCartridgeController } from '../../context/cartridgeProvider';
import { useColorSchemeContext } from '../../context/colorShemeProvider';
import { useEffect } from 'react';


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
  const {
    cartridgeDown,
    cartridgeUp,
    currentGame,
    isGameSelectionAllowed,
    setIsGameSelectionAllowed,
  } = useCartridgeController();

  
  useKeyboard({ key: keys.UP, callback: cartridgeUp })
  useKeyboard({ key: keys.DOWN, callback: cartridgeDown })
  const {getClassNameForCurrentScheme} = useColorSchemeContext();
  const currentClass = getClassNameForCurrentScheme('background')
  useEffect(()=>console.log(currentClass), [currentClass])

    return (
        <div className={`root ${currentClass}`}>
            <Navigation />
            {isGameSelectionAllowed ? 'Game is started' : 'Game is STOPPED'}
            <Console 
                currentGame={currentGame}
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
