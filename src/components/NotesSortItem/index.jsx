import React from 'react'
import styles from './index.module.scss'

function NotesSortItem( { icon, text, onSelect, onAdd, onRemove } ) {
    return (
        <li className={styles.filterItem}>
            <button 
                type='button' 
                className={styles.filterItemBtn}
                onClick={() => {
                    if (onSelect) {
                        onSelect(icon, text);
                    } else {
                        return null
                    }
                    if (onAdd) {
                        onAdd(icon, text);
                    } else {
                        return null
                    }
                }}
            >
                <div className={styles.filterItemIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill={icon} d="M48 0H336C362.5 0 384 21.49 384 48V487.7C384 501.1 373.1 512 359.7 512C354.7 512 349.8 510.5 345.7 507.6L192 400L38.28 507.6C34.19 510.5 29.32 512 24.33 512C10.89 512 0 501.1 0 487.7V48C0 21.49 21.49 0 48 0z" /></svg>
                </div>
                <p className={styles.filterItemText}>{text}</p>
                { onRemove && 
                    <div
                        className={styles.removeCategory}
                        onClick={() => onRemove(text)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill='#b7b7b7' d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"/></svg>
                    </div>
                }
            </button>
        </li>
    )
}

export default NotesSortItem