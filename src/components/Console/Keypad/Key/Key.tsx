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

function Key({label, onClick, onMouseDown, onMouseUp, size, activator, disabled}: KeyProps) {
    useEffect(() => console.log('Disabled', disabled), [disabled])
    const pressedClass = useGetKeyPressedMarkClass(activator)
    const {getClassNameForCurrentScheme} = useColorSchemeContext();
    const keyClass = getClassNameForCurrentScheme('key')  
    return (
      <div className={styles.container}>
        <div className={styles.label}>{label}</div>
        <div 
          className={`${styles.edge} ${pressedClass} ${styles[keyClass]}  ${getSizeClass(size)} ${keyClass} ${disabled ? styles.disabled : ''}`}
          onClick={(e) => { if (!disabled && onClick) onClick(e); } }
          onMouseDown={(e) => {if (!disabled) onMouseDown(e)}}
          onMouseUp={(e) => { if (!disabled) onMouseUp(e) }} 
          ></div>
      </div>
  );
}

export default Key;
