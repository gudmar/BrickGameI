import { Modal } from '../Modal/Modal';

const CONTENT = (
    <div>
        It takes more then 8h work a day to be a good software developer. People trust different applicatoins with their fortune and even lifes.
        That is why in this profesion one should constantly develop: learn new libraries, languages, patterns, best practices... Also after hours...
        Is it possible to think about things you do at work after hours for free? Yes, as long as you are dirven by passion. <br></br>
        This is what made me write this game. Passion towards programming.<br></br>
        If you look at source code of this <q>brick game</q> you may discover strange things...
        What is the purpose of using classes in functional react? Why state, that is kept in classes is repeted in functional components?
        The reason for this is that I like experimenting with the code I do in free time. I read books about different patterns and designs, and I 
        experiment, I try to use them and, perhaps, discover something new.<br></br>
        In this application I tried to use classes as game next state calculator with memory, and I use react only for GUI creation. In this approach
        you have to calculate and remember every important detail in class, and use API for communication with react. React on the other hand
        needs state constants to render proper values. This approach makes game logic independent from this framework, it is reusable.
        Of course state is remembered in 2 places, but only class changes it.<br></br>
        There is a lot of ugly code here, but it is the trade off. If I wasn't creating this at nights, when I am not that effective, it would be not possible for
        me to write this game at all...<br></br>
        <b>Enjoy</b>
    </div>
)

export const About = ({isOpen, closeAbout}: {isOpen: boolean, closeAbout: () => void}) => {
    return (
        <Modal closeModal = {closeAbout} isOpen = {isOpen}>
            {CONTENT}
        </Modal>
    )
}