import React from 'react';
import './styles.css';
import { WidgetItemProps } from '../WidgetPropsInterface';

function NavButton({ label, onClick }: WidgetItemProps) {
    return (
        <div className="housing" onClick={onClick}>
          <span className='name'>{label}</span>
        </div>
  );
};
export default NavButton;
