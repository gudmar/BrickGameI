import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';
import ExpandIcon from '../../../Icons/ExpandIcon'
import { WidgetItemProps } from '../WidgetPropsInterface';

function NavSelect({ label, onClick, items }: WidgetItemProps) {
  const isExpandable = !items ? false : items.length > 0;
  const [value, setValue] = useState<String>('')
  useEffect(() => {if(items && items.length > 0) setValue(items[0])}, [items, setValue])
    return (
        <div className={styles.container} onClick={onClick}>
          <>{isExpandable && <div className = {styles.icon}><ExpandIcon variant='white'/></div>}</>
          <>{isExpandable && <span className={styles.space}></span>}</>
          <span className='name'>{`${label} :`}</span><span className={styles.value}>{value}</span>
        </div>
  );
};
export default NavSelect;
