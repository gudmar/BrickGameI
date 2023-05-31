import React, { useEffect } from 'react';
import { useColorSchemeContext } from '../../../../context/colorShemeProvider';
import { useGetKeyPressedMarkClass } from '../../../../hooks/useIsKeyPressed';
import { KeyProps, KeySize } from './KeyInterfaces';
import styles from './styles.module.css';

const getSizeClass = (size: KeySize) => {
  if (size === KeySize.small) return styles.small;
  if (size === KeySize.medium) return styles.medium;
  return styles.big;
}

function Key({label, onClick, onMouseDown, onMouseUp, size, activator}: KeyProps) {
    const pressedClass = useGetKeyPressedMarkClass(activator)
    const {getClassNameForCurrentScheme} = useColorSchemeContext();
    const keyClass = getClassNameForCurrentScheme('key')  
    return (
      <div className={styles.container}>
        <div className={styles.label}>{label}</div>
        <div className={`${styles.edge} ${pressedClass} ${styles[keyClass]}  ${getSizeClass(size)} ${keyClass}`} onClick={onClick} onMouseDown={onMouseDown} onMouseUp={onMouseUp} ></div>
      </div>
  );
}

export default Key;
