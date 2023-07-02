import React, { ReactNode, useRef } from 'react';
import styles from './style.module.css';

type IconSize = 'small' | 'big' | 'medium'

const getEdge = (size: IconSize) => {
  if (size === 'big') return '70px';
  if (size === 'medium') return '50px';
  if (size === 'small') return '30px';
}

const Icon = ({ iconImageLight, iconImageDark, size }: {size: IconSize, iconImageLight: ReactNode, iconImageDark: ReactNode }) => ({variant='black'}: {variant: 'black'|'white'}) => {
    const isWhite = variant === 'white';
    const edge = getEdge(size);
  return (
    <span className={styles.icon} style={
      { width: edge, height: edge }
    }>
      {isWhite ? iconImageLight : iconImageDark }
    </span>
  )
}

export default Icon
