import React from 'react';
import styles from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import Field from '../../Field/index.tsx';
import NotesInfo from '../../NotesInfo/index.tsx';
import { AnimatePresence, Reorder } from 'framer-motion';
import NoteRedact from '../../NoteRedact/index.tsx';
import { reorderItem } from '../../../redux/slices/notesSlice.ts';
import { setRedact } from '../../../redux/slices/noteRedactSlice.ts';
import { RootState } from '../../../redux/store';
import { INote } from '../../../types';

type NotesTabProps = {
  noteRedact: boolean;
  inputValue: string;
  filterItems: Object[];
  categories: Object[];
  filterCategory: () => void;
  filteredNotes: {}[];
  notesMapped: JSX.Element | JSX.Element[];
  currentNotes: Object[];
  elementsHidden: boolean;
};

const NotesTab: React.FC<NotesTabProps> = ({
  noteRedact,
  inputValue,
  filterItems,
  categories,
  filterCategory,
  filteredNotes,
  notesMapped,
  currentNotes,
  elementsHidden,
}) => {
  const dispatch = useDispatch();
  const notes = useSelector((state: RootState) => state.notes.items);

  const reorderNote = (item: INote[]) => {
    dispatch(reorderItem(item));
  };
  return (
    <>
      <div className={styles.topbar}>
        {!noteRedact ? (
          notes.length >= 2 ? (
            <Field className={styles.noteField} placeholder="Поиск заметок" />
          ) : null
        ) : null}
        {!noteRedact ? (
          <NotesInfo
            notes={notes}
            inputValue={inputValue}
            filterItems={filterItems}
            categories={categories}
            filterCategory={filterCategory}
          />
        ) : null}
      </div>
      {!noteRedact ? (
        <Reorder.Group
          axys="y"
          style={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto' }}
          values={filteredNotes}
          onReorder={reorderNote}>
          {notesMapped}
        </Reorder.Group>
      ) : (
        <AnimatePresence>
          <NoteRedact key="redact" redactCategories={categories} />
        </AnimatePresence>
      )}
      {!noteRedact ? (
        <button
          className={`${
            currentNotes.length > 4 ? styles.addBtn + ' ' + styles._sticky : styles.addBtn
          } ${elementsHidden ? styles.hidden : ''}`}
          onClick={() => dispatch(setRedact({
            visible: true,
            id: '',
            title: '',
            category: 'Без категории',
            categoryColor: '#b7b7b7',
            description: '',
          }))}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" />
          </svg>
        </button>
      ) : null}
    </>
  );
};
export default NotesTab;
