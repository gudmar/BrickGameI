import React from 'react';
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
    return (
      <div className={styles.container}>
        <div className={styles.label}>{label}</div>
        <div className={`${pressedClass} ${styles.edge} ${getSizeClass(size)}`} onClick={onClick} onMouseDown={onMouseDown} onMouseUp={onMouseUp} ></div>
      </div>
  );
}

export default Key;
