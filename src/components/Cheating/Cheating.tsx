import { codesDescription } from '../../constants/gameCodes';
import { useCartridgeController } from '../../context/cartridgeProvider';
import { Modal } from '../Modal/Modal';

const CONTENT = (
    <div>
        My name is Marek, I am a full stack js developer. At the moment I work with
        React and Node.js. I do my best to stay fit in my profession, so I
        develop all the time. This game is a prove. I wrote it after-hours.
        Its purpose was to practice a bit object oriented programming and design patterns.
        It is interesting to write an application that handles a few games, that are quite different
        but have to share a common interface and some common logic.
        I practiced things i read in books about software architecture.
        Business logic (game logic) is completly separated from React interface,
        making it possible to reuse this game logic with any other js framework, or even
        js its self.
        At work I use MUI for css, but here I decided to write everything from scratch,
        so I revise css a little bit.
        Enjoy.
    </div>
)
function CodeDescriptions({currentGame}: {currentGame: string}) {

    if (!codesDescription[currentGame]) return <></>
    return (
      <>
        <h3>Game codes for {currentGame}</h3>
        <b>NOTE: </b><i>Inserted code makes you a cheater</i>
        <ul>
          {
            codesDescription[currentGame].map(({code, description}) => 
              <li key={`${currentGame}${code}${description}`}><b>{code}</b>: <i>{description}</i></li>)
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
