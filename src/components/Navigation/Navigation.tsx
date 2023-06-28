import React, { useState } from 'react';
import styles from './styles.module.css';
import { useGameState } from '../../context/gameStateContext';
import { useCartridgeController } from '../../context/cartridgeProvider';
import { CARTRIDGE_ORDER } from '../../constants/cartridgeLibrary';
import NavSelect from './NavWidget/NavSelect/NavSelect';
import NavButton from './NavWidget/NavButton/NavButton';
import { COLOR_SCHEMES, useColorSchemeContext } from '../../context/colorShemeProvider';
import { About } from '../About/About';
import { Cheating } from '../Cheating/Cheating';
import { GameControls } from '../GameControls/GameControls';
import { useMelody } from '../../context/musicProvider';

const LevelSpeed = ['1', '2', '3', '4' ,'5', '6', '7', '8','9', '10']

function Navigation() {
  const {
    level, speed, setLevel, setSpeed, isGameStarted,
  } = useGameState();
   const [isAboutOpen, setIsAboutOpen] = useState(false);
   const [isCheatingOpen, setIsCheatingOpen] = useState(false);
   const [isGameControlOpen, setIsGameControlOpen] = useState(false);
   const {currentGame, setCartridgeByDescription} = useCartridgeController();
   const {currentColorScheme, setCurrentColorScheme} = useColorSchemeContext();
   const {melodyNames, melody, setCurrentMelodyName, isPlaying} = useMelody();

   const setGameLevel = (event: any) => { setLevel(event.target.textContent) }
   const setGameSpeed = (event: any) => { setSpeed(event.target.textContent) }
   const setCartridge = (event: any) => { setCartridgeByDescription(event.target.textContent)}
   const setColorScheme = (event: any) => {setCurrentColorScheme(event.target.textContent)}
   const setMelodyFromEvent = (event: any) => {setCurrentMelodyName(event.target.textContent)}
  
    return (
        <div className={styles.bar}>
          {isAboutOpen && <About isOpen={isAboutOpen} closeAbout={()=>setIsAboutOpen(false)}/>}
          {isCheatingOpen && <Cheating isOpen={isCheatingOpen} closeCheating={()=>setIsCheatingOpen(false)}/>}
          {isGameControlOpen && <GameControls isOpen={isGameControlOpen} closeGameControls={()=>setIsGameControlOpen(false)}/>}
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
          <NavSelect
            label={'Melodies'}
            onSelect={setMelodyFromEvent}
            items={melodyNames}
            value={melody.name}
            disabled={isPlaying}
          />
          <NavButton
            label={'Cheating'}
            onClick={() => {setIsCheatingOpen(true)}}
          />
          <NavButton
            label={'Controls'}
            onClick={() => {setIsGameControlOpen(true)}}
          />
          <NavButton
            label={'About'}
            onClick={() => {setIsAboutOpen(true)}}
            disabled={isGameStarted}
          />
        </div>
  );
}

export default Navigation;
