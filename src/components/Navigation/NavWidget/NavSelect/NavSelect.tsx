import React, {useEffect, useState} from 'react';
import './styles.css';
import ExpandIcon from '../../../Icons/ExpandIcon'
import { WidgetItemProps } from '../WidgetPropsInterface';

function NavSelect({ label, onClick, items }: WidgetItemProps) {
  const isExpandable = !items ? false : items.length > 0;
  const [value, setValue] = useState<String>('')
  useEffect(() => {if(items && items.length > 0) setValue(items[0])}, [items])
    return (
        <div className="housing" onClick={onClick}>
          <>{isExpandable && <ExpandIcon variant='white'/>}</>
          <>{isExpandable && <span className="space"></span>}</>
          <span className='name'>{`${label} :`}</span><span className='value'>{value}</span>
        </div>
  );
};
export default NavSelect;
