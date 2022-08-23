import React from 'react'
import styles from './index.module.scss'

function Modal( {children, visible} ) {
    return (
        <div className={ visible ? styles.modal + ' ' + styles._modalActive : styles.modal }>
            <div className={styles.modal__body}>
                {children}
            </div>
        </div>
    )
}

export default Modal