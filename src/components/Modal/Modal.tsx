import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.css';

export const Modal = ({children, isOpen, closeModal}:{closeModal: ()=>void, children: ReactNode, isOpen: boolean}) => {
    if (isOpen === false) return <></>
    return ( createPortal(
        (<div className={styles.shutter} onClick={closeModal}>
            <div className={styles.content}>
                {children}
            </div>
        </div>),
        document.body

    )
    )
}
