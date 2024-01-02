import React, { useEffect, useState } from 'react';
import styles from './index.module.scss'
import { ReactComponent as Category } from '../../icons/bookmark.svg'
import { Reorder, useDragControls } from 'framer-motion';
import { ref, remove, set } from 'firebase/database';
import { db } from '../../firebase.ts';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../redux/hooks/useAuth.ts';
import { RootState } from '../../redux/store';
import NoteActions from '../NoteActions/index.tsx';
import clsx from 'clsx';
import { setRedact } from '../../redux/slices/noteRedactSlice.ts';

export type NoteTypes = {
    id: string;
    label: string;
    description: string;
    category: string;
    categoryIcon: string;
    day: string;
    month: string;
    selected: boolean;
    onRedact: (id: string, label: string, description: string, category: string, categoryIcon: string) => void;
    noteRedact: boolean;
    item: {};
}

const noteAnimation = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };
  
  const Note: React.FC<NoteTypes> = ({ id, label, description, category, categoryIcon, day, month, selected, onRedact, noteRedact, item }) => {
      const [isDraggable, setIsDraggable] = useState(false);
      const [noteSelected, setNoteSelected] = useState(false);
      const [noteId, setNoteId] = useState('');
      const dispatch = useDispatch();

      const months: string[] = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(',');
      const nowMonth: string[] = months[month];
      const notes = useSelector((state: RootState) => state.notes.items);
      const userId = useSelector((state: RootState) => state.user.id);
      const { isAuth } = useAuth();
      
    const controls = useDragControls();

    useEffect(() => {
        if (!isDraggable) {
            if (isAuth) {
                set(ref(db, 'notes/' + userId), notes);
            }
        }
    }, [isDraggable]);
    return (
        <Reorder.Item dragListener={false} dragControls={controls} key={id} value={item} {...noteAnimation}>
                            <div
                    className={styles.note}
                    id={id}
                    onClick={() => {
                        onRedact(id, label, description, category, categoryIcon);
                    }}
                    style={ noteSelected ? {zIndex: 2} : {} }
                    onTouchStart={(e) => {
                        setTimeout(() => {
                            // const parentOfNote = e.target.closest('li');
                            // const targetNote = parentOfNote.children[0];
                            // const targetNoteId = targetNote.getAttribute('id');
                            // console.log(parentOfNote);
                            
                            // setNoteSelected(true);
                            // dispatch(setRedact({
                            //     visible: false,
                            //     category: '',
                            //     categoryColor: '',
                            //     description: '',
                            //     id: targetNoteId,
                            //     title: '',
                            // }));
                            // setNoteId(targetNoteId);
                        }, 1500)
                        
                    }}
                >
                    <div className={styles.note__category}>
                        { category === 'Без категории' || category === 'Избранное' ? null : <Category fill={categoryIcon}/> }
                    </div>
                    <div className={styles.note__items}>
                        <div className={styles.note__content}>
                            <h2 className={styles.note__label}>{noteRedact ? label : label.length > 27 ? label.slice(0, 27) + '...' : label}</h2>
                            <div className={styles.note__date}>{day + ' ' + nowMonth} {selected ? <span className={styles.selected}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z" /></svg></span> : null}</div>
                        </div>
                    </div>
                    <div 
                        className={styles.note__draggable + ' ' + (isDraggable ? styles.note__draggableActive : '')} 
                        onMouseEnter={() => {
                            setIsDraggable(true);
                        }}
                        onMouseLeave={() => {
                            setIsDraggable(false);
                        }}
                        onTouchStart={() => {
                            setIsDraggable(true);
                        }}
                        onTouchEnd={() => {
                            setIsDraggable(false);
                        }}
                        onPointerDown={(e) => controls.start(e)}
                        style={{ touchAction: "none" }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M278.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l9.4-9.4V224H109.3l9.4-9.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4H224V402.7l-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-9.4 9.4V288H402.7l-9.4 9.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l9.4 9.4H288V109.3l9.4 9.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-64-64z"/></svg>
                    </div>
                </div>
                {/* <NoteActions visible={noteSelected} id={noteId}/> */}
        </Reorder.Item>
    )
}

export default Note