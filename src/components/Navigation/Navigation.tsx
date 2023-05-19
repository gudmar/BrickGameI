import React from 'react';
import NavWidget from './NavWidget/NavWidget';
import styles from './styles.module.css';
import { WidgetType } from './NavWidget/WidgetPropsInterface';

const LevelSpeed = ['0', '1', '2', '3', '4' ,'5', '6', '7', '8','9', '10']

const buttons = [
  {
    widgetType: WidgetType.SELECT, label: 'Game', onClick: () => {},  items: [
      'Tetris', 'Snake'
    ]
  },
  {
    label: 'Speed', onClick: () => {}, 
    items: LevelSpeed,
  },
  {label: 'Level', onClick: () => {}, items: LevelSpeed},
  {label: 'Skin', onClick: () => {}, items: ['Normal']},
  {label: 'About', onClick: () => {}},
]

function Navigation() {
  
    return (
        <div className={styles.bar}>
          {buttons.map(
              button => <NavWidget
                label={button.label}
                onClick={button.onClick}
                items={button.items}
                key={button.label}
              />
            )
          }
        </div>
  );
}

export default Navigation;
