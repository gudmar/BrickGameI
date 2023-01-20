import React from 'react';
import './styles.css';
import ExpandIcon from '../../Icons/ExpandIcon'

interface Props {
  label: string,
  onClick: (e: React.MouseEvent<HTMLElement>) => void,
  isExpandable: boolean,
}

function NavButton({ label, onClick, isExpandable }: Props) {
  
    return (
        <div className="housing" onClick={onClick}>
          <>{isExpandable && <ExpandIcon variant='white'/>}</>
          <>{isExpandable && <span className="space"></span>}</>
          <span className='name'>{label}</span>
        </div>
  );
};
export default NavButton;
