import React from 'react';
import styles from './styles.module.css';
import { NavigationButtonInterface, WidgetItemProps } from '../WidgetPropsInterface';

function NavButton({ label, onClick }: NavigationButtonInterface) {
    return (
        <div className={styles.container} onClick={onClick}>
          <span className='name'>{label}</span>
        </div>
  );
};
export default NavButton;
