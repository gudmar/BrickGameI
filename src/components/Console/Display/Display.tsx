import React from 'react';
import { useCartridge } from '../../../hooks/useCartridge';
import { DisplayProps } from '../brickInterfaces';
import Dojo from './Dojo/Dojo';
import styles from './styles.module.css';

function Display(
   {speed, level, currentGame}: DisplayProps
) {

  const { cartridgeLibrary } = useCartridge();
  
    return (
        <div className={styles.display}>
          <div className={styles.dojoSection}>
            <Dojo />
          </div>
          <div className={styles.scoreSection}></div>
        </div>
  );
}

export default Display;
