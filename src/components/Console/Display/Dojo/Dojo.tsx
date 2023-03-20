import { BrickMap } from '../../../../types/types';
import Brick from '../Brick/Brick';
import BrickLine from './BrickLine/BrickLine';
import styles from './styles.module.css';

interface DojoParams {
  brickMap: BrickMap,
}

function Dojo ({ brickMap }: DojoParams) {
  // useEffect(()=>{console.log(brickMap)}, [])
    return (
      <>
        {brickMap.map((line, index) => (<BrickLine key={'line-'+index} lineMap={line} />))}
      </>
  );
}

export default Dojo;
