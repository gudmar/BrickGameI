import React from 'react';
import './style.css';
import ExpandWhite from '../../IconImages/ExpandWhite.svg';
import ExpandBlack from '../../IconImages/ExpandBlack.svg';


function ExpandIcon({variant='black'}: {variant: 'black'|'white'}) {
    const isWhite = variant === 'white';
  return (
    <span className='icon'>
        <img
          src={ isWhite ? ExpandWhite : ExpandBlack }
          alt=""
        />
    </span>
  )
}

export default ExpandIcon
