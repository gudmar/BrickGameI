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

    return (
        <div className={`root ${currentClass}`}>
            <Navigation />
            <Console 
                currentGame={currentGame}
                setIsGameSelectionAllowed = {setIsGameSelectionAllowed}
            />
        </div>
  );
}

export default BrickGame;
