import React, { useContext, useEffect, useState } from 'react'
import styles from '../Body/index.module.scss'
import Navbar from '../Navbar/index.tsx'
import TasksTab from '../Navbar/TasksTab/index.tsx'
import NotesTab from '../Navbar/NotesTab/index.tsx'
import Toolbar from '../Toolbar/index.tsx'
import Modal from '../Modal/index.tsx'
import Button from '../Button/index.tsx'
import Prompt from '../Prompt/index.tsx'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, loadLocalStorage, onRemoveItem, onUpdateItem } from '../../redux/slices/tasksSlice'
import { setRedactCategory, setRedactColor, setRedactDescription, setRedactId, setRedactTitle, setRedactVisible } from '../../redux/slices/noteRedactSlice'
import Note, { NoteTypes } from '../Note/index.tsx'
import Placeholder from '../Placeholder/index.tsx'
import { setValue } from '../../redux/slices/searchSlice'
import AppContext from '../../context'

type BodyTypeProps = {
    noteRedact: boolean;
    filterItems: {}[];
    categories: {}[];
    noteRedactTitle: string;
    noteRedactDescription: string;
    confirmModal: boolean;
};

const navbarTasksTabIcon = [
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12.5" cy="12.5" r="12" stroke="#b7b7b7" />
      <path
        d="M18.7279 8.26412C19.0907 8.61572 19.0907 9.18391 18.7279 9.53551L11.299 16.7363C10.9362 17.0879 10.35 17.0879 9.98728 16.7363L6.27197 13.1359C5.90934 12.7843 5.90934 12.2161 6.27197 11.8645C6.63466 11.5129 7.22259 11.5129 7.58533 11.8645L10.617 14.8264L17.4163 8.26412C17.779 7.91196 18.3652 7.91196 18.7279 8.26412Z"
        fill="#b7b7b7"
      />
    </svg>,
  ];
const navbarNotesTabIcon = [
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1 6V21.0013C1 21.5614 1.45107 22 2.00748 22H16V17.0059C16 15.8866 16.8945 15 17.9979 15H22V6H1ZM1 5V1.99875C1 1.44715 1.43861 1 1.99875 1H21.0013C21.5528 1 22 1.44995 22 2.00685V5H1ZM16.5 23H2.00011C0.895478 23 0 22.0984 0 20.9991V2.00086C0 0.895817 0.901627 0 2.00086 0H20.9991C22.1042 0 23 0.894514 23 1.99406V15.5V16L17 23H16.5ZM17 21.5V17.0088C17 16.4516 17.4507 16 17.9967 16H21.7L17 21.5ZM3 9V10H20V9H3ZM3 12V13H20V12H3ZM3 15V16H14V15H3ZM3 18V19H14V18H3Z"
        fill="#b7b7b7"
      />
    </svg>,
];

const Body: React.FC<BodyTypeProps> = ({ noteRedact, filterItems, categories, noteRedactTitle, noteRedactDescription, confirmModal, }) => {
    const { currentNotes, filterCategory, elementsHidden, setConfirmModal, onRemoveNote }: any = useContext(AppContext);
    const dispatch = useDispatch();
    const tasks = useSelector((state: any) => state.tasks.items);
    const inputValue = useSelector((state: any) => state.search.value);
    const theme = useSelector((state: any) => state.theme.theme);
  
    const [taskGetDate, setTaskGetDate] = useState('');
    const [taskGetMonth, setTaskGetMonts] = useState('');

    const selectedNotes = currentNotes.filter((note: NoteTypes) => note.selected === true);
    const defaultNotes = currentNotes.filter((note: NoteTypes) => note.selected === false);
    const filteredNotes = [...selectedNotes, ...defaultNotes].filter((note: NoteTypes) =>
      note.label.toLowerCase().includes(inputValue.toLowerCase()),
    );
  
    // Определение мобильного устройства
    let isMobile = {
      Android: function () {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
      },
      any: function () {
        return (
          isMobile.Android() ||
          isMobile.BlackBerry() ||
          isMobile.iOS() ||
          isMobile.Opera() ||
          isMobile.Windows()
        );
      },
    };

    const onRedactNote = (id: string, title: string, description: string, category: string, icon: string) => {
        dispatch(setRedactVisible(true));
        dispatch(setRedactId(id));
        dispatch(setRedactTitle(title));
        dispatch(setRedactColor(icon));
        dispatch(setRedactCategory(category));
        dispatch(setRedactDescription(description));
    };
  
    const notesMapped =
      currentNotes.length > 0 ? (
        filteredNotes.length > 0 ? (
          filteredNotes.map((note: NoteTypes) => {
            return (
              <Note
                key={note.id}
                id={note.id}
                label={note.label}
                description={note.description}
                day={note.day}
                month={note.month}
                selected={note.selected}
                categoryIcon={note.categoryIcon}
                category={note.category}
                onRedact={onRedactNote}
                noteRedact={noteRedact}
                item={note}
              />
            );
          })
        ) : (
          <Placeholder
            image="img/noNotes.svg"
            title="Ничего не найдено"
            text="Не удалось найти заметку с введённым названием."
          />
        )
      ) : (
        <Placeholder
          image="img/noNotes.svg"
          title="Заметок нет"
          text="Добавьте заметку и она появится здесь."
        />
      );
  
    useEffect(() => {
      const tasks = JSON.parse(localStorage.getItem('tasks')!);

      if (tasks) {
        dispatch(loadLocalStorage(tasks));
      }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        setTaskGetDate(String(new Date().getDate()));
        setTaskGetMonts(String(new Date().getMonth()));
      }, [tasks]);
    
      const addTask = () => {
        if (inputValue !== '' && inputValue !== ' ') {
          const task = {
            checkState: false,
            id: Math.random().toString(16).slice(2),
            title: inputValue,
            day: taskGetDate,
            month: taskGetMonth,
            dateVisible: true,
          };
          dispatch(addItem(task));
          // setTasks((prev) => [task, ...prev.map((task) => {
          //   if (String(task.day) === String(new Date().getDate()) && String(task.month) === String(new Date().getMonth())) {
          //     return {
          //       ...task,
          //       dateVisible: false,
          //     }
          //   }
          //   return task
          // })]);
          dispatch(setValue(''));
        }
      };
    
      const onRemoveTask = (id: string, dateVisible: boolean) => {
        dispatch(onRemoveItem({ id, dateVisible }));
      };
    
      const onUpdateTask = (id: string, title: string) => {
        dispatch(onUpdateItem({ id, title }));
      };
    
  return (
    <div className={styles.todo__body}>
    <div className={styles.todo__content} style={noteRedact ? { marginBottom: '0px' } : undefined}>
      <Navbar>
        {/* Tasks tab */}
        <div className={styles.todo__tasks} label="Задачи" image={navbarTasksTabIcon}>
          <TasksTab fieldAction={addTask} taskRemove={onRemoveTask} taskUpdate={onUpdateTask} />
        </div>
        {/* Notes tab */}
        <div className={styles.todo__notes} label="Заметки" image={navbarNotesTabIcon}>
            <NotesTab 
              noteRedact={noteRedact} 
              inputValue={inputValue} 
              filterItems={filterItems}
              categories={categories}
              filterCategory={filterCategory}
              filteredNotes={filteredNotes}
              notesMapped={notesMapped}
              currentNotes={currentNotes}
              elementsHidden={elementsHidden}
              setRedactVisible={setRedactVisible}
            />
        </div>
      </Navbar>
      {/* Toolbar */}
      {noteRedact && (noteRedactTitle !== '' || noteRedactDescription !== '') ? (
        <Toolbar />
      ) : null}
      <Modal visible={confirmModal} sm_size>
        <p className={styles.modalText}>
          Вы действительно хотите <br /> удалить заметку?
        </p>
        <div style={{ display: 'flex' }}>
          <Button
            onClick={() => setConfirmModal(false)}
            disabled={false}
            text="Отмена"
            btnColor="#2525ff"
          />
          <Button onClick={onRemoveNote} disabled={false} text="Удалить" btnColor="#f00" />
        </div>
      </Modal>
      {/* <Modal visible={donatModal}>
        <div className={styles.donate__body}>
          <div className={styles.donate__content}>
            <h2 className={styles.donate__title}>Поддержи Todo донатом</h2>
            <div className={styles.donate__icon}>
              <img src='./img/donate__icon.png' />
            </div>
            <p className={styles.donate__text}>
              Todo старается быть максимально
              комфортным и удобным в
              использовании для своих
              пользователей. Если вы хотите, чтобы Todo и дальше мог развиваться и получать больше новых функций,
              вы можете поддержать проект и внести свой вклад в его развитие!
            </p>
            <a
              href='https://www.donationalerts.com/r/iventeye'
              target='blank'
              className={styles.donate__btn}
              onClick={() => {
                setDonatModal(false);
                setThanksDonatModal(true);
              }}
            >
              Поддержать Todo
            </a>
            <div className={styles.donate__back}>
              <Button
                text="Назад"
                onClick={() => {
                  setDonatModal(false);
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
      <Modal visible={thanksDonatModal}>
          <div className={styles.donate__body + ' ' + styles.donate__bodyThanks}>
            <div className={styles.donate__content}>
              <h2 className={styles.donate__title} style={{ flex: 0 }}>Спасибо за поддержку!</h2>
              <div className={styles.donate__icon}>
                <img src='./img/thanks.svg' />
              </div>
              <div className={styles.donate__image}>
                <img src='./img/handels.png' />
              </div>
              <div className={styles.donate__back} style={{ marginTop: "auto" }}>
                <Button
                  text="Назад"
                  onClick={() => {
                    setThanksDonatModal(false);
                  }}
                />
              </div>
            </div>
          </div>
      </Modal> */}
      <Prompt
        image={
          isMobile.any()
            ? theme === 'light'
              ? 'img/add_on_screen_m-black.svg'
              : 'img/add_on_screen_m-white.svg'
            : theme === 'light'
            ? 'img/add_on_screen_d-black.svg'
            : 'img/add_on_screen_d-white.svg'
        }
        text="Для удобства добавьте Todo на главный экран и используйте как приложение."
      />
    </div>
  </div>
  )
}

export default Body