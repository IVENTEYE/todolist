import React from 'react'
import { useState, useEffect } from 'react';
import CategoriesItem from '../CategoriesItem';
import CategoriesFilter from '../CategoriesFilter';
import styles from './index.module.scss'
import { useContext } from 'react';
import AppContext from '../../context';
import { ReactComponent as Category } from '../../icons/bookmark.svg'
import { ReactComponent as AllNotes } from '../../icons/notes.svg'
import { ReactComponent as SelectedNotes } from '../../icons/star_solid.svg'

function Categories({ filter, categories, setCategory, onFilter }) {
    const { inputValue } = useContext(AppContext);
    const [filterVisible, setFilterVisible] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState('');
    const [selectedValue, setSelectedValue] = useState('Все заметки');
    const categoriesRef = React.useRef();

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

    useEffect(() => {
        const closeCategoriesPopup = e => {
            if (!e.path.includes(categoriesRef.current)) {
                setFilterVisible(false);
            }
        };

        document.body.addEventListener('click', closeCategoriesPopup);
    }, []);

    const onSelectCategory = (icon, text) => {
        setSelectedIcon(icon);
        setSelectedValue(text);
        setFilterVisible(false);
    }

    return (
        <div ref={categoriesRef} className={styles.notesFilter}>
            <button onClick={() => setFilterVisible(!filterVisible)} type='button' className={styles.notesFilterSelected}>
                <div className={styles.selectedIcon}>
                    { selectedValue === 'Все заметки' ? <AllNotes /> : selectedValue === 'Избранное' ? <SelectedNotes /> : <Category fill={selectedIcon}/> }
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
            </div>
        </div>
    )
}

export default Categories