import styles from './index.module.scss'

function Note({ id, label, description, category, categoryIcon, day, month, selected, onRedact, noteRedact }) {
    const months = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(',');
    const nowMonth = months[month];
    return (
        <div
            className={styles.note}
            onClick={() => {
                onRedact(id, label, description, category, categoryIcon);
            }}
        >
            <div className={styles.note__category}>
                { category === 'Без категории' || category === 'Избранное' ? null : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill={categoryIcon} d="M48 0H336C362.5 0 384 21.49 384 48V487.7C384 501.1 373.1 512 359.7 512C354.7 512 349.8 510.5 345.7 507.6L192 400L38.28 507.6C34.19 510.5 29.32 512 24.33 512C10.89 512 0 501.1 0 487.7V48C0 21.49 21.49 0 48 0z" /></svg> }
            </div>
            <div className={styles.note__items}>
                <div className={styles.note__content}>
                    <h2 className={styles.note__label}>{noteRedact ? label : label.length > 27 ? label.slice(0, 27) + '...' : label}</h2>
                    <div className={styles.note__date}>{day + ' ' + nowMonth} {selected ? <span className={styles.selected}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z" /></svg></span> : null}</div>
                </div>
            </div>
        </div>
    )
}

export default Note