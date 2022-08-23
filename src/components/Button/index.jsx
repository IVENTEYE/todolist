import React from 'react'
import styles from './index.module.scss'

function Button( { disabled = false, text, onClick } ) {
  return (
    <button 
        type='button' 
        disabled={disabled}
        className={styles.actionBtn}
        onClick={onClick}
    >
        {text}
    </button>
  )
}

export default Button