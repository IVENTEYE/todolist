import React, { useState, useRef } from 'react'
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import AppContext from '../../context';
import NotesSort from '../NotesSort/index.tsx';
import { motion } from 'framer-motion';
import styles from './index.module.scss'
import EditorField from '../Editor/EditorField/index.tsx';


type NoteRedactPropsType = {
    redactCategories: {}[];
}

const noteRedactAnimation = {
    initial: {
        left: "80%",
    },
    animate: {
        left: "0",
    },
    exit: {
        left: "80%"
    },
};

const NoteRedact: React.FC<NoteRedactPropsType> = ( { redactCategories } ) => {
    const menuBarRef = useRef<HTMLDivElement>(null);

    const { onAddNote, onUpdateNote, resetNoteStates }: any = useContext(AppContext);
    const noteRedactId = useSelector((state: any) => state.redact.id);
    const noteRedactTitle = useSelector((state: any) => state.redact.title);
    const noteRedactCategory = useSelector((state: any) => state.redact.category);
    const categoryColor = useSelector((state: any) => state.redact.categoryColor);
    const noteRedactDescription = useSelector((state: any) => state.redact.description)
    const [titleValue, setTitleValue] = useState(noteRedactTitle);
    const [descriptionValue, setDescriptionValue] = useState(noteRedactDescription);
    const [categoryIcon, setCategoryIcon] = useState(categoryColor);
    const [categoryValue, setCategoryValue] = useState(noteRedactCategory);
    const [menuFixed, setMenuFixed] = useState(false);


    const onAddCategory = (icon: string, text: string) => {
        setCategoryValue(text);
        setCategoryIcon(icon);
    }
    
    const descriptionText = descriptionValue.toString().replace(/( |<([^>]+)>)/ig, "");
    
    const menuBarOffset = menuBarRef.current ? menuBarRef.current.offsetTop + 13 : 0;
  
    window.addEventListener('scroll', () => {
      if (menuBarOffset) {
        window.scrollY >= menuBarOffset ? setMenuFixed(true) : setMenuFixed(false);
      }
    });

    return (
        <motion.div transition={{duration: 0.18}} {...noteRedactAnimation} className={styles.noteRedact}>
            <div className={styles.noteRedact__actions}>
                <button
                    type='button'
                    className={styles.noteRedact__action + ' ' + styles.noteRedact__back}
                    onClick={resetNoteStates}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z" /></svg>
                </button>
                {noteRedactId.length > 0 ? titleValue === '' && descriptionText === "" ? null :
                    <button
                        type='button'
                        className={styles.noteRedact__action + ' ' + styles.noteRedact__save}
                        onClick={() => onUpdateNote(noteRedactId, titleValue, descriptionValue, categoryValue, categoryIcon)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z" /></svg>
                    </button>
                    : titleValue === '' && descriptionText === '' ? null :
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
            <div ref={menuBarRef} className={styles.noteRedact__description}>
                {/* <textarea
                    className={styles.noteRedact__textarea}
                    placeholder="Введите текст..."
                    value={descriptionValue}
                    onChange={(e) => setDescriptionValue(e.target.value)}
                >
                </textarea> */}
                <EditorField value={descriptionValue} setValue={setDescriptionValue} menuState={menuFixed}/>
            </div>
        </motion.div>
    )
}

export default NoteRedact