import React from 'react'
import styles from './index.module.scss'

function Button( { disabled = false, text, onClick, btnColor = 'var(--second-color)' } ) {
  return (
    <button 
        type='button' 
        disabled={disabled}
        className={styles.actionBtn}
        onClick={onClick}
        style={{color: btnColor}}
    >
        {text}
    </button>
  )
}

export default Button