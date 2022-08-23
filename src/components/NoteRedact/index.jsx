import React, { useState } from 'react'
import { useContext } from 'react';
import AppContext from '../../context';
import NotesSort from '../NotesSort';
import styles from './index.module.scss'

function NoteRedact( { redactCategories } ) {
    const { onAddNote, onUpdateNote, noteRedactId, noteRedactTitle, categoryColor, noteRedactCategory, noteRedactDescription, resetNoteStates } = useContext(AppContext);
    const [titleValue, setTitleValue] = useState(noteRedactTitle);
    const [descriptionValue, setDescriptionTitleValue] = useState(noteRedactDescription);
    const [categoryIcon, setCategoryIcon] = useState(categoryColor);
    const [categoryValue, setCategoryValue] = useState(noteRedactCategory);
    const onAddCategory = (icon, text) => {
        setCategoryValue(text);
        setCategoryIcon(icon);
    }

    return (
        <div className={styles.noteRedact}>
            <div className={styles.noteRedact__actions}>
                <button
                    type='button'
                    className={styles.noteRedact__action + ' ' + styles.noteRedact__back}
                    onClick={resetNoteStates}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z" /></svg>
                </button>
                {noteRedactId.length > 0 ? titleValue === '' && descriptionValue === '' ? null :
                    <button
                        type='button'
                        className={styles.noteRedact__action + ' ' + styles.noteRedact__save}
                        onClick={() => onUpdateNote(noteRedactId, titleValue, descriptionValue, categoryValue, categoryIcon)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z" /></svg>
                    </button>
                    : titleValue === '' && descriptionValue === '' ? null :
                    <button
                            type='button'
                            className={styles.noteRedact__action + ' ' + styles.noteRedact__save}
                            onClick={() => onAddNote(titleValue, descriptionValue, categoryValue, categoryIcon)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z" /></svg>
                    </button>
                }
            </div>
            <div className={styles.noteRedact__title}>
                <input
                    type="text"
                    className={styles.noteRedact__input}
                    placeholder="Название"
                    value={titleValue}
                    onChange={(e) => setTitleValue(e.target.value)}
                />
            </div>
            <div className={styles.noteRedact__category}>
                <NotesSort categories={redactCategories} defaultValue={noteRedactCategory} icon={categoryColor} setCategory={onAddCategory}/>
            </div>
            <div className={styles.noteRedact__description}>
                <textarea
                    className={styles.noteRedact__textarea}
                    placeholder="Введите текст..."
                    value={descriptionValue}
                    onChange={(e) => setDescriptionTitleValue(e.target.value)}
                >
                </textarea>
            </div>
        </div>
    )
}

export default NoteRedact