import React, { useState } from 'react';
import styles from './styles.module.css';
import { useGameState } from '../../context/gameStateContext';
import { useCartridgeController } from '../../context/cartridgeProvider';
import { CARTRIDGE_ORDER } from '../../constants/cartridgeLibrary';
import NavSelect from './NavWidget/NavSelect/NavSelect';
import NavButton from './NavWidget/NavButton/NavButton';
import { COLOR_SCHEMES, useColorSchemeContext } from '../../context/colorShemeProvider';
import { About } from '../About/About';

const LevelSpeed = ['1', '2', '3', '4' ,'5', '6', '7', '8','9', '10']

function Navigation() {
  const {
    level, speed, setLevel, setSpeed
  } = useGameState();
  const [isModelOpen, setIsModalOpen] = useState(false);
   const {currentGame, setCartridgeByDescription} = useCartridgeController();
   const {currentColorScheme, setCurrentColorScheme} = useColorSchemeContext();

   const setGameLevel = (event: any) => { setLevel(event.target.textContent) }
   const setGameSpeed = (event: any) => { setSpeed(event.target.textContent) }
   const setCartridge = (event: any) => { setCartridgeByDescription(event.target.textContent)}
   const setColorScheme = (event: any) => {setCurrentColorScheme(event.target.textContent)}

  
  
    return (
        <div className={styles.bar}>
          {isModelOpen && <About isOpen={isModelOpen} closeAbout={()=>setIsModalOpen(false)}/>}
          <NavSelect
            label={'Game'}
            onSelect={setCartridge}
            items={CARTRIDGE_ORDER}
            value={currentGame}
          />
          <NavSelect
            label={'Speed'}
            onSelect={setGameSpeed}
            items={LevelSpeed}
            value={speed}
          />
          <NavSelect
            label={'Level'}
            onSelect={setGameLevel}
            items={LevelSpeed}
            value={level}
          />
          <NavSelect
            label={'Skin'}
            onSelect={setColorScheme}
            items={COLOR_SCHEMES}
            value={currentColorScheme}
          />
          <NavButton
            label={'About'}
            onClick={() => {setIsModalOpen(true)}}
          />
        </div>
  );
}

export default Navigation;
