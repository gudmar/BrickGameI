import React from 'react';
import styles from './styles.module.css';
import { WidgetItemProps } from '../WidgetPropsInterface';

function NavButton({ label, onClick }: WidgetItemProps) {
    return (
        <div className={styles.container} onClick={onClick}>
          <span className='name'>{label}</span>
        </div>
  );
};
export default NavButton;
