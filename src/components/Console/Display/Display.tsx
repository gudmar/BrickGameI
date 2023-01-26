import React from 'react';
import Dojo from './Dojo/Dojo';
import styles from './styles.module.css';

function Display() {
  
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
