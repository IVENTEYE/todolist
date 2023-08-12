import React from 'react'
import styles from './index.module.scss'

type DateProps = {
    createdDay: string;
    createdMonth: string;
}

const TheDate: React.FC<DateProps> = ({createdDay, createdMonth}) => {
    const nowDay: string = createdDay;
    const months: string[] = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(',');
    const nowMonth: string[] = months[createdMonth];

    return (
        <div className={styles.date}>
            <div className={styles.date__content}>
                <span>{nowDay}</span> <span>{nowMonth}</span>
            </div>
        </div>
    )
}

export default TheDate