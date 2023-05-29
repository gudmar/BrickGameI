import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useGameState } from '../../context/gameStateContext';
import { useCartridgeController } from '../../context/cartridgeProvider';
import { CARTRIDGE_ORDER } from '../../constants/cartridgeLibrary';
import NavSelect from './NavWidget/NavSelect/NavSelect';
import NavButton from './NavWidget/NavButton/NavButton';
import { COLOR_SCHEMES, useColorSchemeContext } from '../../context/colorShemeProvider';
import { About } from '../About/About';
import { Cheating } from '../Cheating/Cheating';

const LevelSpeed = ['1', '2', '3', '4' ,'5', '6', '7', '8','9', '10']

function Navigation() {
  const {
    level, speed, setLevel, setSpeed, isGameStarted,
  } = useGameState();
   const [isAboutOpen, setIsAboutOpen] = useState(false);
   const [isCheatingOpen, setIsCheatingOpen] = useState(false);
   const {currentGame, setCartridgeByDescription} = useCartridgeController();
   const {currentColorScheme, setCurrentColorScheme} = useColorSchemeContext();

   const setGameLevel = (event: any) => { setLevel(event.target.textContent) }
   const setGameSpeed = (event: any) => { setSpeed(event.target.textContent) }
   const setCartridge = (event: any) => { setCartridgeByDescription(event.target.textContent)}
   const setColorScheme = (event: any) => {setCurrentColorScheme(event.target.textContent)}

  useEffect(() => console.log(isCheatingOpen), [isCheatingOpen])
  
    return (
        <div className={styles.bar}>
          {isAboutOpen && <About isOpen={isAboutOpen} closeAbout={()=>setIsAboutOpen(false)}/>}
          {isCheatingOpen && <Cheating isOpen={isCheatingOpen} closeCheating={()=>setIsCheatingOpen(false)}/>}
          <NavSelect
            label={'Game'}
            onSelect={setCartridge}
            items={CARTRIDGE_ORDER}
            value={currentGame}
            disabled={isGameStarted}
          />
          <NavSelect
            label={'Speed'}
            onSelect={setGameSpeed}
            items={LevelSpeed}
            value={speed}
            disabled={isGameStarted}
          />
          <NavSelect
            label={'Level'}
            onSelect={setGameLevel}
            items={LevelSpeed}
            value={level}
            disabled={isGameStarted}
          />
          <NavSelect
            label={'Skin'}
            onSelect={setColorScheme}
            items={COLOR_SCHEMES}
            value={currentColorScheme}
            disabled={isGameStarted}
          />
          <NavButton
            label={'About'}
            onClick={() => {setIsAboutOpen(true)}}
            disabled={isGameStarted}
          />
          <NavButton
            label={'Cheating'}
            onClick={() => {setIsCheatingOpen(true)}}
          />
        </div>
  );
}

export default Navigation;
