import React from 'react';
import { KeyProps, KeySize } from './KeyInterfaces';
import styles from './styles.module.css';

function Key({label, onClick, size}: KeyProps) {
  
    const getSize = () => {
      if (size === KeySize.small) return styles.small;
      if (size === KeySize.medium) return styles.medium;
      return styles.big;
    }

    return (
      <div className={styles.container}>
        <div className={styles.label}>{label}</div>
        <div className={`${styles.edge} ${getSize()}`} onClick={onClick}></div>
      </div>
  );
}

export default Key;
