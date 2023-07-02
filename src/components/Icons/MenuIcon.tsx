import React, { useMemo } from 'react';
import styles from './style.module.css';
import Icon from './Icon';
import {ReactComponent as MenuIconWhite} from '../../IconImages/hamburgerMenu_white.svg';
import {ReactComponent as MenuIconBlack} from '../../IconImages/hamburgerMenu_black.svg';


const MenuIcon = (variant: 'black' | 'white') => {
    const ColoredIcon = useMemo( () => Icon({
        iconImageDark: <MenuIconBlack />,
        iconImageLight: <MenuIconWhite />,
        size: 'medium'}
    ), [variant]);
    return <ColoredIcon variant={variant} />
}

export default MenuIcon
