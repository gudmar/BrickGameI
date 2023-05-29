import './styles.css';
import Navigation from '../Navigation/Navigation';
import Console from '../Console/Console';
import { keys, useKeyboard } from '../../hooks/useKeyboard';
import { useCartridgeController } from '../../context/cartridgeProvider';
import { useColorSchemeContext } from '../../context/colorShemeProvider';
import { useEffect } from 'react';



function BrickGame() {
  const {
    cartridgeDown,
    cartridgeUp,
    currentGame,
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
        </div>
  );
}

export default BrickGame;
