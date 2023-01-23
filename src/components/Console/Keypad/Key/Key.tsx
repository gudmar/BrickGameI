import React from 'react';
import styles from './styles.module.css';

interface KeyProps {
  label: String
  onClick: () => {}
}

function Key({label, onClick}: KeyProps) {
  
    return (
      <div className={styles.container}>
        <div className={styles.label}>label</div>
        <div className={styles.edge} onClick={onClick}></div>
      </div>
  );
}

export default Key;
