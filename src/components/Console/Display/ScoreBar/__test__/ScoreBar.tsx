import { NextFigure, NextFigurePreview, OneToTen } from '../../../../../types/types';
import { getDigits } from '../../../../Digit/Digits';
import NoSoundIcon from '../../../../Icons/SoundOffIcon';
import SoundIcon from '../../../../Icons/SoundOnIcon';
import { NextFigureDisplay } from '../../NextFigure/NextFigureDisplay';
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
  isCheater?: boolean,
  isPlaying: boolean,
}

function ScoreBar(
  {
    score, level, speed, isGameOver, isGameWon, isGameStarted, isAnimating, isPaused, nextFigure, isCheater, isPlaying
  }: ScoreBarProps) {
  const shouldTurnOffScoreBar = () => {
    if (isAnimating) return true;
    // if (!isGameStarted) return true;
    return false;
  }
  
    return (
        <div className={styles.container}>
          <GameAttribute
            label='Score'
            value={score}
            isOff={shouldTurnOffScoreBar()}
            nrOfDigits={5}
          />
          <div className={styles.space} />
          <NextFigureDisplay nextFigure={nextFigure as NextFigure} />
          <div className={styles.space} />
          <GameAttribute
            label='Speed'
            value={speed}
            isOff={shouldTurnOffScoreBar()}
            nrOfDigits={2}
          />
          <GameAttribute
            label='Level'
            value={level}
            isOff={shouldTurnOffScoreBar()}
            nrOfDigits={2}
          />
          <Band
            label='PAUSED'
            isVisible={isPaused}
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
          <Band
            label='CHEATER !!!'
            isVisible={isCheater}
            isOff={shouldTurnOffScoreBar()}
          />
          <OnOff
            onIcon={
              <SoundIcon variant={isPlaying? 'On' : 'Off'} />
            }
            offIcon={<NoSoundIcon variant={isPlaying? 'On' : 'Off'} />}
            isOn={isPlaying}
          />
        </div>
  );
}

export default ScoreBar;

function OnOff({onIcon, offIcon, isOn}: {onIcon:any, offIcon: any, isOn: boolean}) {
  return (
    <div className={styles.onOff}>
      <div className={isOn?styles.visible:styles.hidden}>{onIcon}</div>
      <div className={isOn?styles.hidden:styles.visible}>{offIcon}</div>
    </div>
  )
}

function Band({label, isVisible, isOff}: {isOff: boolean, label: string, isVisible?:boolean}){
 return (
  <div className={`${isVisible ? styles.visible : styles.hidden} ${styles.band}`}>{label}</div>
 )

}

function GameAttribute({label, value, isOff, nrOfDigits}: {nrOfDigits: number, isOff: boolean, label:string, value: number}){
  const Segment = getDigits(nrOfDigits);
  return (
  <div className={styles.gameAttributeContainer}>
    <div className={`${isOff ? styles.hidden : styles.visible} ${styles.gameAttributeLabel}`}>{label}</div>
    <Segment nrToDisplay={value} />
    {/* <div className={`${isOff ? styles.hidden : styles.visible} ${styles.gameAttributeValue}`}>{value}</div> */}
  </div>
  )
}
