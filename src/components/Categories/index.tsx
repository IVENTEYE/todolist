import React from 'react'
import { useState, useEffect } from 'react';
import CategoriesItem from '../CategoriesItem/index.tsx';
import CategoriesFilter from '../CategoriesFilter/index.tsx';
import styles from './index.module.scss'
import { useContext } from 'react';
import AppContext from '../../context';
import { ReactComponent as Category } from '../../icons/bookmark.svg'
import { ReactComponent as AllNotes } from '../../icons/notes.svg'
import { ReactComponent as SelectedNotes } from '../../icons/star_solid.svg'

type CategoriesPropsType = {
    filter: Array<Object>;
    categories: Array<Object>;
    setCategory?: (icon: string, text: string) => void;
    onFilter: () => void;
}

const Categories: React.FC<CategoriesPropsType> = ({ filter, categories, setCategory, onFilter }) => {
    const { inputValue }: any = useContext(AppContext);
    const [filterVisible, setFilterVisible] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState('');
    const [selectedValue, setSelectedValue] = useState('Все заметки');
    const categoriesRef = React.useRef<HTMLDivElement>(null);

    const categoriesAll = categories.filter((category: any) => category.text !== "Без категории"),
          categoriesBottom = categories.filter((category: any) => category.text === "Без категории"),
          filteredCategories = [...categoriesAll, ...categoriesBottom];
    
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
        const closeCategoriesPopup = (e: any) => {
            if (!e.composedPath().includes(categoriesRef.current)) {
                setFilterVisible(false);
            }
        };

        document.body.addEventListener('click', closeCategoriesPopup);

        return () => {
            document.body.removeEventListener('click', closeCategoriesPopup);
        };
    }, []);

    const onSelectCategory = (icon: string, text: string) => {
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
                            {filter.map((item: any) => {
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
                        {filteredCategories.map((category: any) => {
                            return (
                                <CategoriesItem
                                    key={category.text}
                                    icon={category.icon}
                                    text={category.text}
                                    onSelect={onSelectCategory}
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