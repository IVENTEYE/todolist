import React from 'react'
import styles from "./index.module.scss"
import { ReactComponent as Logo } from "../../icons/logo.svg"

type LoadingProps = {
    text: string;
}

const Loading: React.FC<LoadingProps> = ({ text }) => {
  return (
    <div className={styles.loading}>
        <div className={styles.logo}>
            <Logo className={styles.logoIcon} />
        </div>
        <p className={styles.text}>{text}</p>
    </div>
  )
}

export default Loading