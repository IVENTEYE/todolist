import React from 'react'
// import blank from './img/blank-paper.png';
import styles from './index.module.scss'

type PlaceholderPropsType = {
    image: string;
    title: string;
    text: string;
}

const Placeholder: React.FC<PlaceholderPropsType> = ({ image, title, text }) => {
    return (
        <div className={styles.placeholder}>
            <div className={styles.placeholder__wrapper}>
                <div className={styles.placeholder__image}>
                    <img src={image} alt="Бланк" />
                </div>
                <h2 className={styles.placeholder__title}>{title}</h2>
                <p className={styles.placeholder__text}>{text}</p>
            </div>
        </div>
    )
}

export default Placeholder