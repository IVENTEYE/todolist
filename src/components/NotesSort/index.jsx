import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import AppContext from '../../context';
import Button from '../Button';
import Modal from '../Modal';
import NotesSortItem from '../NotesSortItem';
import styles from './index.module.scss'
import { ReactComponent as Category } from '../../icons/bookmark.svg'

function NotesSort({ categories, defaultValue, icon, setCategory }) {
    const { setCategories, setNotes } = useContext(AppContext);
    // Состояние фильтра
    const [filterVisible, setFilterVisible] = useState(false);
    // Начальное значение категории
    const defaultSelectedValue = defaultValue;
    // Цвет выбранной категории
    const [selectedIcon, setSelectedIcon] = useState(icon === undefined ? '#b7b7b7' : icon);
    // Текст выбранной категории
    const [selectedValue, setSelectedValue] = useState(defaultSelectedValue);
    // Доступные для выбора цвета
    const categoryColors = [
        {
            color: "#f50a0a"
        },
        {
            color: "#31f3ca"
        },
        {
            color: "#31f34c"
        },
        {
            color: "#358cff"
        },
        {
            color: "#ce4cff"
        },
        {
            color: "#f9ff4c"
        },
        {
            color: "#ffb134"
        },
        {
            color: "#f72ad1"
        }
    ];
    const [modal, setModal] = useState(false);
    // Выбранный цвет категории
    const [addColorValue, setAddColorValue] = useState(categoryColors[0].color);
    // Значение категории
    const [newCategoryValue, setNewCategoryValue] = useState('');
    // Состояние для кнопки "Добавить"
    const [addDisabled, setAddDisabled] = useState(true);
    // Состояние предупреждения
    const [warning, setWarning] = useState(false);
    // Состояние модального окна с выбором цвета
    const [chooseColor, setChooseColor] = useState(false);
    const categoriesRef = React.useRef();

    const onSelectCategory = (icon, text) => {
        setSelectedIcon(icon);
        setSelectedValue(text);
        setFilterVisible(false);
    };

    // Сброс значений
    const resetValues = () => {
        setChooseColor(false);
        setAddDisabled(true);
        setNewCategoryValue('');
    };

    // Закрытие popup
    const onClickBack = () => {
        setModal(!modal);
        resetValues();
    };

    // Добавление категории
    const onAddCategory = () => {
        // Проверка на повторяющиеся категории
        if (categories.filter(category => category.text === newCategoryValue).length > 0) {
            setAddDisabled(true);
            setWarning(true);
        } else {
            setCategories(prev => [...prev.filter(category => category.text !== 'Без категории'), {
                icon: addColorValue,
                text: newCategoryValue
            }, ...prev.filter(category => category.text === 'Без категории')]);
            resetValues();
            setAddColorValue(categoryColors[0].color);
        }
    };

    // Удаление категории
    const onRemoveCategory = (textCategory) => {
        setCategories(prev => prev.filter(category => category.text !== textCategory));
        setNotes(prev => prev.map(item => {
            if (item.category === textCategory) {
                return {
                    ...item,
                    categoryIcon: '#b7b7b7',
                    category: 'Без категории'
                }
            }
            return item
        }));
    }

    useEffect(() => {
        if (modal) {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    onClickBack();
                }
            });
        }
    }, [modal]);

    useEffect(() => {
        const closeCategoriesPopup = e => {
            if (!e.path.includes(categoriesRef.current)) {
                setFilterVisible(false);
            }
        };

        document.body.addEventListener('click', closeCategoriesPopup);
    }, []);

    return (
        <>
            <Modal visible={modal}>
                <h2 className={styles.title}>Изменение категорий</h2>
                <ul className={styles.categoriesList}>
                    {categories.filter(category => category.text !== 'Без категории').map(category => {
                        return (
                            <NotesSortItem
                                key={category.text}
                                icon={category.icon}
                                text={category.text}
                                onRemove={onRemoveCategory}
                            />
                        )
                    })}
                </ul>
                <div className={styles.addCategory}>
                    <ul className={chooseColor ? styles.chooseColor + ' ' + styles._active : styles.chooseColor}>
                        {
                            categoryColors.map(color => {
                                return (
                                    <li key={color.color}  className={styles.chooseColorItem}>
                                        <button 
                                            type='button'
                                            className={styles.chooseColorBtn}
                                            onClick={(e) => {
                                                const targetColor = !e.target.getAttribute('fill') ? e.target.querySelector('path').getAttribute('fill') : e.target.getAttribute('fill');
                                                setAddColorValue(targetColor);
                                                setChooseColor(false);
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill={color.color} d="M48 0H336C362.5 0 384 21.49 384 48V487.7C384 501.1 373.1 512 359.7 512C354.7 512 349.8 510.5 345.7 507.6L192 400L38.28 507.6C34.19 510.5 29.32 512 24.33 512C10.89 512 0 501.1 0 487.7V48C0 21.49 21.49 0 48 0z" /></svg>
                                        </button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <button
                        type='button'
                        className={styles.addCategoryColor}
                        onClick={() => {
                            setChooseColor(!chooseColor);
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill={addColorValue} d="M48 0H336C362.5 0 384 21.49 384 48V487.7C384 501.1 373.1 512 359.7 512C354.7 512 349.8 510.5 345.7 507.6L192 400L38.28 507.6C34.19 510.5 29.32 512 24.33 512C10.89 512 0 501.1 0 487.7V48C0 21.49 21.49 0 48 0z" /></svg>
                    </button>
                    <input
                        type="text"
                        placeholder='Имя категории'
                        className={styles.addCategoryText}
                        value={newCategoryValue}
                        onChange={(e) => {
                            setNewCategoryValue(e.target.value);
                            if (e.target.value !== '' && e.target.value !== ' ') {
                                setAddDisabled(false);
                                setWarning(false);
                            } else {
                                setAddDisabled(true);
                            }

                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                onAddCategory();
                            }
                        }}
                        style={warning ? { borderColor: 'red' } : null}
                    />
                    <p className={warning ? styles.inputWarning + ' ' + styles._active : styles.inputWarning}>Такая категория существует.</p>
                </div>
                <div className={styles.addCategoryButtons}>
                    <Button 
                        onClick={onClickBack} 
                        disabled={false} 
                        text="Назад" 
                    />
                    <Button onClick={onAddCategory} disabled={addDisabled} text="Добавить" />
                </div>
            </Modal>
            <div ref={categoriesRef} className={styles.notesFilter}>
                <button onClick={() => setFilterVisible(!filterVisible)} type='button' className={styles.notesFilterSelected}>
                    <div className={styles.selectedIcon}>
                        <Category fill={selectedIcon} />
                    </div>
                    <span>{selectedValue}</span>
                </button>
                <div
                    className={filterVisible ? styles.notesFilterBody + ' ' + styles._active : styles.notesFilterBody}
                    style={{ left: 3 + 'px' }}
                >
                    <div className={styles.filter}>
                        <ul className={styles.filterCategories}>
                            {categories.map(category => {
                                return (
                                    <NotesSortItem
                                        key={category.text}
                                        icon={category.icon}
                                        text={category.text}
                                        onSelect={onSelectCategory}
                                        onAdd={setCategory}
                                    />
                                )
                            })}
                        </ul>
                    </div>
                    <ul className={styles.createCategory}>
                        <li className={styles.actionItem}>
                            <button
                                type='button'
                                className={styles.actionItemBtn}
                                onClick={() => {
                                    setFilterVisible(false);
                                    setModal(true);
                                }}
                            >
                                <div className={styles.actionItemIcon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill='#b7b7b7' d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" /></svg>
                                </div>
                                <p className={styles.actionItemText}>Создать</p>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default NotesSort