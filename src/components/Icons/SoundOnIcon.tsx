import React from 'react';
import styles from './style.module.css';
import SoundHidden from '../../IconImages/SoundHidden.svg';
import SoundVisible from '../../IconImages/SoundVisible.svg';


function SoundIcon({variant='On'}: {variant: 'On'|'Off'}) {
    const isOn = variant === 'On';
  return (
    <span className={styles.icon}>
        <img
          src={ isOn ? SoundVisible : SoundHidden }
          alt=""
        />
    </span>
  )
}

export default SoundIcon
