import React from 'react';
import styles from './style.module.css';
import { ReactComponent as SoundHidden } from '../../IconImages/SoundHidden.svg';
import { ReactComponent as SoundVisible } from '../../IconImages/SoundVisible.svg';


function SoundIcon({variant='On'}: {variant: 'On'|'Off'}) {
    const isOn = variant === 'On';
  return (
    <span className={styles.icon}>
      { isOn ? <SoundVisible/> : <SoundHidden/> }
        {/* <img
          src={ isOn ? SoundVisible : SoundHidden }
          alt=""
        /> */}
    </span>
  )
}

export default SoundIcon
