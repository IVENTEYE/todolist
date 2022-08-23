import React from 'react'
import { useState, useEffect } from 'react';
import CategoriesItem from '../CategoriesItem';
import CategoriesFilter from '../CategoriesFilter';
import styles from './index.module.scss'
import { useContext } from 'react';
import AppContext from '../../context';

function Categories({ filter, categories, setCategory, onFilter }) {
    const { inputValue } = useContext(AppContext);
    const [filterVisible, setFilterVisible] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState('');
    const [selectedValue, setSelectedValue] = useState('Все заметки');
    const allNotesIcon = <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1 6V21.0013C1 21.5614 1.45107 22 2.00748 22H16V17.0059C16 15.8866 16.8945 15 17.9979 15H22V6H1ZM1 5V1.99875C1 1.44715 1.43861 1 1.99875 1H21.0013C21.5528 1 22 1.44995 22 2.00685V5H1ZM16.5 23H2.00011C0.895478 23 0 22.0984 0 20.9991V2.00086C0 0.895817 0.901627 0 2.00086 0H20.9991C22.1042 0 23 0.894514 23 1.99406V15.5V16L17 23H16.5ZM17 21.5V17.0088C17 16.4516 17.4507 16 17.9967 16H21.7L17 21.5ZM3 9V10H20V9H3ZM3 12V13H20V12H3ZM3 15V16H14V15H3ZM3 18V19H14V18H3Z" fill="#b7b7b7" /></svg>;
    const selectedNotesIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill='#b7b7b7' d="M287.9 0C297.1 0 305.5 5.25 309.5 13.52L378.1 154.8L531.4 177.5C540.4 178.8 547.8 185.1 550.7 193.7C553.5 202.4 551.2 211.9 544.8 218.2L433.6 328.4L459.9 483.9C461.4 492.9 457.7 502.1 450.2 507.4C442.8 512.7 432.1 513.4 424.9 509.1L287.9 435.9L150.1 509.1C142.9 513.4 133.1 512.7 125.6 507.4C118.2 502.1 114.5 492.9 115.1 483.9L142.2 328.4L31.11 218.2C24.65 211.9 22.36 202.4 25.2 193.7C28.03 185.1 35.5 178.8 44.49 177.5L197.7 154.8L266.3 13.52C270.4 5.249 278.7 0 287.9 0L287.9 0zM287.9 78.95L235.4 187.2C231.9 194.3 225.1 199.3 217.3 200.5L98.98 217.9L184.9 303C190.4 308.5 192.9 316.4 191.6 324.1L171.4 443.7L276.6 387.5C283.7 383.7 292.2 383.7 299.2 387.5L404.4 443.7L384.2 324.1C382.9 316.4 385.5 308.5 391 303L476.9 217.9L358.6 200.5C350.7 199.3 343.9 194.3 340.5 187.2L287.9 78.95z" /></svg>;
    const categoryIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill={selectedIcon} d="M48 0H336C362.5 0 384 21.49 384 48V487.7C384 501.1 373.1 512 359.7 512C354.7 512 349.8 510.5 345.7 507.6L192 400L38.28 507.6C34.19 510.5 29.32 512 24.33 512C10.89 512 0 501.1 0 487.7V48C0 21.49 21.49 0 48 0z" /></svg>;

    useEffect(() => {
        const filterIcon = localStorage.getItem('filterIcon');
        const filterValue = localStorage.getItem('filterValue');

        if (filterIcon) {
            setSelectedIcon(filterIcon);
        }

        if (filterValue) {
            setSelectedValue(filterValue);
        }

    }, [inputValue]);
    

    useEffect(() => {
        localStorage.setItem('filterValue', selectedValue);
        localStorage.setItem('filterIcon', selectedIcon);
    }, [selectedValue]);

    const onSelectCategory = (icon, text) => {
        setSelectedIcon(icon);
        setSelectedValue(text);
        setFilterVisible(false);
    }

    return (
        <div className={styles.notesFilter}>
            <button onClick={() => setFilterVisible(!filterVisible)} type='button' className={styles.notesFilterSelected}>
                <div className={styles.selectedIcon}>
                    { selectedValue === 'Все заметки' ? allNotesIcon : selectedValue === 'Избранное' ? selectedNotesIcon : categoryIcon }
                </div>
                <span>{selectedValue}</span>
            </button>
            <div 
                className={filterVisible ? styles.notesFilterBody + ' ' + styles._active : styles.notesFilterBody} 
                style={filter.length === 0 ? {left: 3 + 'px'} : {right: 0}}
                >
                <div className={styles.filter}>
                        <ul className={styles.filterNotes}>
                            {filter.map(item => {
                                return (
                                    <CategoriesFilter
                                        key={item.text}
                                        icon={item.icon}
                                        text={item.text}
                                        onSelect={onSelectCategory}
                                        onFilter={onFilter}
                                    />
                                )
                            })}
                        </ul>
                    <ul className={styles.filterCategories}>
                        {categories.map(category => {
                            return (
                                <CategoriesItem
                                    key={category.text}
                                    icon={category.icon}
                                    text={category.text}
                                    onSelect={onSelectCategory}
                                    onAdd={setCategory}
                                    onFilter={onFilter}
                                />
                            )
                        })}
                    </ul>
                </div>
                {/* <ul className={styles.createCategory}>
                    <NotesSortItem
                        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill='#b7b7b7' d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" /></svg>}
                        text="Создать"
                        onSelect={() => null}
                        onAdd={() => null}
                    />
                </ul> */}
            </div>
        </div>
    )
}

export default Categories