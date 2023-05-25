import React from 'react';
import styles from './styles.module.css';
import { WidgetType } from './NavWidget/WidgetPropsInterface';
import { useGameState } from '../../context/gameStateContext';
import { useCartridgeController } from '../../context/cartridgeProvider';
import { CARTRIDGE_ORDER } from '../../constants/cartridgeLibrary';
import NavSelect from './NavWidget/NavSelect/NavSelect';
import NavButton from './NavWidget/NavButton/NavButton';

const LevelSpeed = ['1', '2', '3', '4' ,'5', '6', '7', '8','9', '10']

function Navigation() {
  const {
    level, speed, setLevel, setSpeed
  } = useGameState();
   const {currentGame, setCartridgeByDescription} = useCartridgeController();

   const setGameLevel = (event: any) => { console.log(event); setLevel(event.target.textContent) }
   const setGameSpeed = (event: any) => { console.log(event); setSpeed(event.target.textContent) }
   const setCartridge = (event: any) => { setCartridgeByDescription(event.target.textContent)}

  
  
    return (
        <div className={styles.bar}>
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
            onSelect={() => {}}
            items={['Graphite', 'Black', 'Red']}
            value={'Graphite'}
          />
          <NavButton
            label={'About'}
            onClick={() => {}}
          />



          {/* {buttons.map(
              button => <NavWidget
                label={button.label}
                onClick={button.onClick}
                items={button.items}
                key={button.label}
              />
            )
          } */}
        </div>
  );
}

export default Navigation;
