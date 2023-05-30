import { codesDescription } from '../../constants/gameCodes';
import { useCartridgeController } from '../../context/cartridgeProvider';
import { Modal } from '../Modal/Modal';
import styles from './styles.module.css'

function CodeDescriptions({currentGame}: {currentGame: string}) {

    if (!codesDescription[currentGame]) return <></>
    return (
      <>
        <h3 className={styles.title}>Game codes for {currentGame}</h3>
        <b>NOTE: </b><i>Inserted code makes you a cheater</i>
        <ul>
          {
            codesDescription[currentGame].map(({code, description}) => 
              <li key={`${currentGame}${code}${description}`}><span className={styles.code}>{code}</span>: <span className={styles.description}>
              {description}</span></li>)
          }
        </ul>
      </>
    )
  }

export const Cheating = ({isOpen, closeCheating}: {isOpen: boolean, closeCheating: () => void}) => {
    const { currentGame } = useCartridgeController();
    return (
        <Modal closeModal = {closeCheating} isOpen = {isOpen}>
            <CodeDescriptions currentGame={currentGame}/>
        </Modal>
    )
}
