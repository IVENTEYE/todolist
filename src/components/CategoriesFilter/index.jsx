import React from 'react'
import styles from './index.module.scss'

function CategoriesFilter( { icon, text, onSelect, onFilter } ) {
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
                    {icon}
                </div>
                <p className={styles.filterItemText}>{text}</p>
            </button>
        </li>
    )
}

export default CategoriesFilter