import React from 'react'
import styles from './index.module.scss'

function TheDate({createdDay, createdMonth}) {
    // const nowDate = createdAt;
    const nowDay = createdDay;
    const months = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(',');
    const nowMonth = months[createdMonth];

    return (
        <div className={styles.date}>
            <div className={styles.date__content}>
                <span>{nowDay}</span> <span>{nowMonth}</span>
            </div>
        </div>
    )
}

export default TheDate