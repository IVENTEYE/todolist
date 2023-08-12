import React from 'react'
import styles from './index.module.scss'

type BtnPropsType = {
  disabled: boolean;
  text: string;
  onClick: () => void;
  btnColor?: string;
}

const Button: React.FC<BtnPropsType> = ( { disabled = false, text, onClick, btnColor = 'var(--second-color)' } ) => {
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