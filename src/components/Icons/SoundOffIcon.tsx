import React from 'react';
import styles from './style.module.css';
import { ReactComponent as NoSoundHidden } from '../../IconImages/NoSoundHidden.svg';
import { ReactComponent as NoSoundVisible } from '../../IconImages/NoSoundVisible.svg';


function NoSoundIcon({variant='On'}: {variant: 'On'|'Off'}) {
    const isOn = variant === 'On';
  return (
    <span className={styles.icon}>
      {isOn ? <NoSoundHidden/>:<NoSoundVisible/>}
        {/* <img
          src={ !isOn ? NoSoundVisible : NoSoundHidden }
          alt=""
        /> */}
    </span>
  )
}

export default NoSoundIcon
