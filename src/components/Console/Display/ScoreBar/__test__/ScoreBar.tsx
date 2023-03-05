import React from 'react';
import { NextFigurePreview, OneToTen } from '../../../../../types/types';
import styles from './styles.module.css';

interface ScoreBarProps {
  score: number,
  level: OneToTen,
  speed: OneToTen,
  isGameOver?: boolean,
  isGameWon?: boolean,
  isGameStarted?: boolean,
  isPaused?: boolean,
  nextFigure: NextFigurePreview,
  isAnimating: boolean,
}

function ScoreBar(
  {
    score, level, speed, isGameOver, isGameWon, isGameStarted, isAnimating
  }: ScoreBarProps) {
  const shouldTurnOffScoreBar = () => {
    if (isAnimating) return true;
    if (!isGameStarted) return true;
    return false;
  }
  
    return (
        <div className={styles.container}>
          <GameAttribute
            label='Score'
            value={score}
            isOff={shouldTurnOffScoreBar()}
          />
          <GameAttribute
            label='Speed'
            value={speed}
            isOff={shouldTurnOffScoreBar()}
          />
          <GameAttribute
            label='Level'
            value={level}
            isOff={shouldTurnOffScoreBar()}
          />
          <Band
            label='PAUSED'
            isVisible={isGameOver}
            isOff={shouldTurnOffScoreBar()}
          />
          <Band
            label='Game over'
            isVisible={isGameOver}
            isOff={shouldTurnOffScoreBar()}
          />
          <Band
            label='GAME WON'
            isVisible={isGameWon}
            isOff={shouldTurnOffScoreBar()}
          />
          <Band
            label='Press start'
            isVisible={!isGameStarted}
            isOff={shouldTurnOffScoreBar()}
          />


        </div>
  );
}

export default ScoreBar;

function Band({label, isVisible, isOff}: {isOff: boolean, label: string, isVisible?:boolean}){
 return (
  <div className={`${isVisible ? styles.visible : styles.hidden} ${styles.band}`}>{label}</div>
 )

}

function GameAttribute({label, value, isOff}: {isOff: boolean, label:string, value: number}){
  return (
  <div className={styles.gameAttributeContainer}>
    <div className={`${isOff ? styles.hidden : styles.visible} ${styles.gameAttributeLabel}`}>{label}</div>
    <div className={`${isOff ? styles.hidden : styles.visible} ${styles.gameAttributeValue}`}>{value}</div>
  </div>
  )
}
