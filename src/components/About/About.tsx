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

export const About = ({isOpen, closeAbout}: {isOpen: boolean, closeAbout: () => void}) => {
    return (
        <Modal closeModal = {closeAbout} isOpen = {isOpen} content = {CONTENT} />
    )
}