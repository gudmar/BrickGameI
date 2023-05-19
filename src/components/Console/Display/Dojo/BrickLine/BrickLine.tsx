import { BrickMode } from "../../../brickInterfaces"
import Brick from "../../Brick/Brick"
import styles from './styles.module.css';

interface LineMap {
    lineMap: number[],
}

const BrickLine = ({ lineMap }: LineMap) => {
    return (
      <div className={styles.line}>
        {lineMap.map((brick, index) => (
          brick === 0 ? <Brick key={index + '-brick'} mode={BrickMode.GameOff} /> :
          <Brick key={index + '-brick'} mode={BrickMode.GameOn} />  
        ))}
      </div>
    )
  }

  export default BrickLine
