import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.css';

export const Modal = ({content, isOpen, closeModal}:{closeModal: ()=>void, content: ReactNode, isOpen: boolean}) => {
    if (isOpen === false) return <></>
    return ( createPortal(
        (<div className={styles.shutter} onClick={closeModal}>
            <div className={styles.content}>
                {content}
            </div>
        </div>),
        document.body

    )
    )
}
