import React from 'react';
import styles from './index.module.scss';
import Categories from '../Categories/index.tsx';

type NotesInfoPropsType = {
  notes: {}[];
  inputValue: string;
  filterItems: {}[];
  categories: {}[];
  filterCategory: () => void;
}

const NotesInfo: React.FC<NotesInfoPropsType> = ({ notes, inputValue, filterItems, categories, filterCategory }) => {
  
  return (
    <>
      {notes.length > 0 && inputValue === '' ? (
        <div className={styles.notesInfo}>
          <div className={styles.notesInfoItems}>
            <>
              <div className={styles.noteCounter}>Всего заметок: {notes.length}</div>
              {notes.length > 1 && (
                <Categories
                  filter={filterItems}
                  categories={categories}
                  onFilter={filterCategory}
                />
              )}
            </>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default NotesInfo;
