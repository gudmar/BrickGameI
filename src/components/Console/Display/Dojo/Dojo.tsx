import React, { memo, useEffect } from 'react';
import { BrickMap } from '../../../../types/types';
import { BrickMode } from '../../brickInterfaces';
import Brick from '../Brick/Brick';
import styles from './styles.module.css';

interface DojoParams {
  brickMap: BrickMap,
}

interface LineMap {
  lineMap: number[],
}

function Line ({ lineMap }: LineMap) {
  return (
    <div className={styles.line}>
      {lineMap.map((brick, index) => (
        brick === 0 ? <Brick key={index + '-brick'} mode={BrickMode.GameOff} /> :
        <Brick key={index + '-brick'} mode={BrickMode.GameOn} />  
      ))}
    </div>
  )
}

function Dojo ({ brickMap }: DojoParams) {
  // useEffect(()=>{console.log(brickMap)}, [])
    return (
      <>
        {brickMap.map((line, index) => (<Line key={'line-'+index} lineMap={line} />))}
      </>
  );
}

export default Dojo;
