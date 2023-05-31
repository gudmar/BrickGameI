import { Modal } from "../Modal/Modal"
import styles from './styles.module.css';

const controlsData = [
  { key: 'Up arrow', description: 'Go up' },
  { key: 'Down arrow', description: 'Go down'},
  { key: 'Left arrow', description: 'Go left'},
  { key: 'Right arrow', description: 'Go right'},
  { key: 'p', description: 'Set / unset pause'},
  { key: 's', description: 'Speed up'},
  { key: 'l', description: 'level up'},
  { key: 'x', description: 'Reset state of console'},
  { key: 'Space', description: 'Rotate / fire / accelerate'},
  { key: 'Enter', description: 'Start game'},
]

export const GameControls = ({closeGameControls, isOpen}: {closeGameControls: () => void, isOpen: boolean}) => {
    return (
      <Modal closeModal={closeGameControls} isOpen={isOpen}>
        <div className={styles.center}>
        <table className={styles.noMargin}>
          <thead>
            <tr>
              <th className={styles.header}>Key</th><th className={styles.header}>Description</th>
            </tr>
          </thead>
          <tbody>
            {controlsData.map(({key, description}) => (
              <tr key={key}>
                <td className={`${styles.right} ${styles.bold}`}>{key}</td><td className={`${styles.left} ${styles.italic}`}>{description}</td>
              </tr>
            ))}
          </tbody>

        </table>
        </div>
      </Modal>
    )
}
