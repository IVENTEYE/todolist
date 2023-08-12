import React from 'react'
import styles from './index.module.scss'

export type FilterProps = {
    icon: string;
    text: string;
    onSelect: (icon: string, text: string) => void;
    onFilter: (text: string) => void;
}

const CategoriesFilter: React.FC<FilterProps> = ( { icon, text, onSelect, onFilter } ) => {
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