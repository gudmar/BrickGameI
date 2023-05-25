import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';
import ExpandIcon from '../../../Icons/ExpandIcon'
import { WidgetItemProps } from '../WidgetPropsInterface';

function NavSelect({ label, onSelect, items, value }: WidgetItemProps) {
  const isExpandable = !items ? false : items.length > 0;
    return (
      <div className={styles.container}>
        <div className={styles.headline}>
          <>{isExpandable && <div className = {styles.icon}><ExpandIcon variant='white'/></div>}</>
          <>{isExpandable && <span className={styles.space}></span>}</>
          <span className='name'>{`${label} :`}</span><span className={styles.value}>{value}</span>
        </div>
        <div className={styles.menu}>
          {
            items!.map((item) => <div className={styles.menuItem} onClick={onSelect}>{item}</div>)
          }
        </div>
      </div>
  );
};

NavSelect.defaultProps = {
  items: [],
}

export default NavSelect;
