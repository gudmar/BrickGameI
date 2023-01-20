import React from 'react';
import NavButton from './NavButton/NavButton';
import './styles.css';

const buttons = [
  {label: 'Game', onClick: () => {}, isExpandable: true},
  {label: 'Speed', onClick: () => {}},
  {label: 'Level', onClick: () => {}},
  {label: 'Skin', onClick: () => {}},
  {label: 'About', onClick: () => {}},
]

function Navigation() {
  
    return (
        <div className="bar">
          {buttons.map(
              button => <NavButton 
                label={button.label}
                onClick={button.onClick}
                isExpandable={button.isExpandable || false}
              />
            )
          }
        </div>
  );
}

export default Navigation;
