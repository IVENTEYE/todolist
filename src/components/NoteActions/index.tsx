import React from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { removeNote } from '../../redux/slices/notesSlice.ts';
import { RootState } from '../../redux/store';

type IActionsProps = {
  visible: boolean;
  id: string;
};

const NoteActions: React.FC<IActionsProps> = ({ visible, id }) => {
  const noteRedactId = useSelector((state: RootState) => state.redact.id);

  const dispatch = useDispatch();

  return (
    <ul className={clsx(styles.actions, visible ? styles.active : '')}>
      <li
        onClick={() => {
          dispatch(removeNote({noteRedactId: id}));
        }}>
        <button className={styles.actionsButton} type="button">
          Удалить
        </button>
      </li>
      <li>
        <button className={styles.actionsButton} type="button">
          Удалить
        </button>
      </li>
      <li>
        <button className={styles.actionsButton} type="button">
          Удалить
        </button>
      </li>
      <li>
        <button className={styles.actionsButton} type="button">
          Удалить
        </button>
      </li>
    </ul>
  );
};

export default NoteActions;
