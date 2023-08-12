import React from 'react'
import styles from './index.module.scss'

type ModalPropsType = {
    children: React.ReactNode;
    visible: boolean;
    sm_size?: boolean;
}

const Modal: React.FC<ModalPropsType> = ( {children, visible, sm_size = false} ) => {
    return (
        <div className={ (sm_size ? styles.modal__sm : '') + ' ' + (visible ? styles.modal + ' ' + styles._modalActive : styles.modal) }>
            <div className={styles.modal__body}>
                {children}
            </div>
        </div>
    )
}

export default Modal