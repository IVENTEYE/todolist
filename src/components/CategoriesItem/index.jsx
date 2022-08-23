import React from 'react'
import styles from './index.module.scss'

function CategoriesItem( { icon, text, onSelect, onFilter } ) {
    return (
        <li className={styles.filterItem}>
            <button 
                type='button' 
                className={styles.filterItemBtn}
                onClick={() => {
                    onSelect(icon, text);
                    onFilter(text);
                }}
            >
                <div className={styles.filterItemIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill={icon} d="M48 0H336C362.5 0 384 21.49 384 48V487.7C384 501.1 373.1 512 359.7 512C354.7 512 349.8 510.5 345.7 507.6L192 400L38.28 507.6C34.19 510.5 29.32 512 24.33 512C10.89 512 0 501.1 0 487.7V48C0 21.49 21.49 0 48 0z" /></svg>
                </div>
                <p className={styles.filterItemText}>{text}</p>
            </button>
        </li>
    )
}

export default CategoriesItem