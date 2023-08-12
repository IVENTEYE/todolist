import React from 'react'
import styles from './index.module.scss'
import { ReactComponent as Category } from '../../icons/bookmark.svg'
import { FilterProps } from '../CategoriesFilter'

const CategoriesItem: React.FC<FilterProps> = ( { icon, text, onSelect, onFilter } ) => {

    return (
        <li className={styles.filterItem}>
            <button 
                type='button' 
                className={styles.filterItemBtn}
                onClick={(e) => {
                    onSelect(icon, text);
                    onFilter(text);
                }}
            >
                <div className={styles.filterItemIcon}>
                    <Category fill={icon}/>
                </div>
                <p className={styles.filterItemText}>{text}</p>
            </button>
        </li>
    )
}

export default CategoriesItem