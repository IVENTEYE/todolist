import React from 'react';
import { useEffect, useState } from 'react';
import styles from '../App.module.scss';
import AppContext from '../context';
import Header from '../components/Header/index.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { loadLocalStorage, onChangeStateItem, setTasksLoading } from '../redux/slices/tasksSlice.ts';
import { setTheme } from '../redux/slices/themeSlice.ts';
import { setRedact } from '../redux/slices/noteRedactSlice.ts';
import {
  addNote,
  localStorageNotes,
  removeNote,
  selectNote,
  setNotesLoading,
  updateNote,
} from '../redux/slices/notesSlice.ts';
import Body from '../components/Body/index.tsx';
import { db } from '../firebase.ts';
import {
  child,
  get,
  ref,
  remove,
  set,
  update,
} from 'firebase/database';
import { useAuth } from '../redux/hooks/useAuth.ts';
import { setUser } from '../redux/slices/userSlice.ts';
import Tooltip from '../components/Tooltip/index.tsx';
import { setImage, setText } from '../redux/slices/tooltipSlice.ts';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ICategory, INote, ITask } from '../types';
import { RootState } from '../redux/store';

const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function Home() {
  const [elementsHidden, setElementsHidden] = useState(false);
  const [taskId, setTaskId] = useState('');
  const [categories, setCategories] = useState([
    {
      icon: '#f50a0a',
      text: 'Личное',
    },
    {
      icon: '#31f3ca',
      text: 'Учеба',
    },
    {
      icon: '#31f34c',
      text: 'Повседневное',
    },
    {
      icon: '#b7b7b7',
      text: 'Без категории',
    },
  ]);
  const { isAuth, id, email, token } = useAuth();

  const dispatch = useDispatch();
  const auth = getAuth();

  const theme = useSelector((state: RootState) => state.theme.theme);
  const tasks: ITask[] = useSelector((state: RootState) => state.tasks.items);
  const notes: INote[] = useSelector((state: RootState) => state.notes.items);
  const noteRedact = useSelector((state: RootState) => state.redact.visible);
  const noteRedactId = useSelector((state: RootState) => state.redact.id);
  const noteRedactTitle = useSelector((state: RootState) => state.redact.title);
  const noteRedactDescription = useSelector((state: RootState) => state.redact.description);
  const tooltipText = useSelector((state: RootState) => state.tooltip.text);
  const tooltipImage = useSelector((state: RootState) => state.tooltip.image);
  const [userLoginned, setUserLoginned] = useState(false);
  const [noteGetDate, setNoteGetDate] = useState('');
  const [noteGetMonth, setNoteGetMonts] = useState('');
  const [currentNotes, setCurrentNotes] = useState(notes ? notes : []);

  const [confirmModal, setConfirmModal] = useState(false);
  const [donatModal, setDonatModal] = useState(false);
  const [thanksDonatModal, setThanksDonatModal] = useState(false);
  const [dataSaveModal, setDataSaveModal] = useState(false);

  const filterItems = [
    {
      icon: (
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
        </svg>
      ),
      text: 'Все заметки',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path
            fill="#b7b7b7"
            d="M287.9 0C297.1 0 305.5 5.25 309.5 13.52L378.1 154.8L531.4 177.5C540.4 178.8 547.8 185.1 550.7 193.7C553.5 202.4 551.2 211.9 544.8 218.2L433.6 328.4L459.9 483.9C461.4 492.9 457.7 502.1 450.2 507.4C442.8 512.7 432.1 513.4 424.9 509.1L287.9 435.9L150.1 509.1C142.9 513.4 133.1 512.7 125.6 507.4C118.2 502.1 114.5 492.9 115.1 483.9L142.2 328.4L31.11 218.2C24.65 211.9 22.36 202.4 25.2 193.7C28.03 185.1 35.5 178.8 44.49 177.5L197.7 154.8L266.3 13.52C270.4 5.249 278.7 0 287.9 0L287.9 0zM287.9 78.95L235.4 187.2C231.9 194.3 225.1 199.3 217.3 200.5L98.98 217.9L184.9 303C190.4 308.5 192.9 316.4 191.6 324.1L171.4 443.7L276.6 387.5C283.7 383.7 292.2 383.7 299.2 387.5L404.4 443.7L384.2 324.1C382.9 316.4 385.5 308.5 391 303L476.9 217.9L358.6 200.5C350.7 199.3 343.9 194.3 340.5 187.2L287.9 78.95z"
          />
        </svg>
      ),
      text: 'Избранное',
    },
  ];

  const onSetTasks = async () => {
    if (isAuth) {
      await set(ref(db, 'tasks/' + id), tasks);
    }
  };

  const onChangeStateTask = async (taskId, state) => {
    dispatch(onChangeStateItem({ taskId, state }));
    if (isAuth) {
      setTaskId(taskId);
    }
  };

  const actionTooltip = (text: string, image: string) => {
    dispatch(setText(text));
    dispatch(setImage(image));
    setDataSaveModal(true);
    setTimeout(() => {
      setDataSaveModal(false);
    }, 3000);
  };

  useEffect(() => {
    dispatch(setTheme(defaultDark ? 'dark' : 'light'));
    const storageTheme = localStorage.getItem('theme');
    const notes: INote[] = JSON.parse(localStorage.getItem('notes') || '[]');
    const storageCategories: ICategory[] = JSON.parse(localStorage.getItem('categories') || '[]');
    const login: boolean = JSON.parse(localStorage.getItem('userLoginned') || "false");

    if (login) {
      setUserLoginned(login);
    }

    if (storageTheme) {
      dispatch(setTheme(String(storageTheme)));
    }

    if (storageTheme === 'dark') {
      document.body.style.backgroundColor = '#1a2c4a';
    }

    const fetchNotes = async () => {
      dispatch(setNotesLoading(true));
      try {
        await get(child(ref(db), `notes/${id}`)).then((snapshot) => {
          const mergeNotes: INote[] = [];
          if (snapshot.exists()) {
            const response: INote[] = Object.values(snapshot.val());
            response.forEach((res: INote) => mergeNotes.push(res));
            if (notes.length > 0) {
              actionTooltip("Данные успешно перенесены", "./img/done.png");
              notes.forEach((note: INote) => {
                mergeNotes.push(note);
              });
            }
            dispatch(localStorageNotes(mergeNotes));
            dispatch(setNotesLoading(false));
          } else {
            console.log('No data available');
            if (notes.length > 0) {
              actionTooltip("Данные успешно перенесены", "./img/done.png");
            }
          }
        });
      } catch (e) {
        console.error('Error adding document: ', e);
      }
      localStorage.removeItem('notes');
    };

    const fetchCategories = async () => {
      try {
        await get(child(ref(db), `categories/${id}`)).then((snapshot) => {
          if (snapshot.exists()) {
            const response: ICategory[] = snapshot.val();
            setCategories(response);
          } else {
            console.log('No data available');
          }
        });
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    };

    if (isAuth) {
      fetchNotes();
      if (storageCategories.length) {
        set(ref(db, `categories/${id}`), storageCategories);
      }
      fetchCategories();
    } else {
      if (notes) {
        dispatch(localStorageNotes(notes));
      }

      if (categories.length > 0) {
        setCategories(storageCategories);
      }
    }

    // if (!firstShowModal) {
    //   setTimeout(() => {
    //     setDonatModal(true);
    //     localStorage.setItem('firstShowModal', true);
    //   }, 4000)
    // }

    setCurrentNotes(notes);
  }, []);

  useEffect(() => {
    if (taskId === '') return;
    onSetTasks();
  }, [taskId]);

  useEffect(() => {
    if (isAuth) {
      localStorage.setItem('user', JSON.stringify({ id, email, token }));
      setUserLoginned(true);
    }
  }, [id, email, token]);

  useEffect(() => {
    localStorage.setItem('userLoginned',  JSON.stringify(userLoginned));

    if (userLoginned && !isAuth) {
      dispatch(setNotesLoading(true));
      dispatch(setTasksLoading(true));
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          dispatch(setUser({email: user.email, token: user.accessToken, id: user.uid}));
          const { uid } = user;
          try {
            await get(child(ref(db), `notes/${id}`)).then((snapshot) => {
              if (snapshot.exists()) {
                const response = snapshot.val();
                
                dispatch(localStorageNotes(response[uid] ? response[uid] : []));
                dispatch(setNotesLoading(false));
              }
            });

            await get(child(ref(db), `tasks/${id}`)).then((snapshot) => {
              if (snapshot.exists()) {
                const response = snapshot.val();
                dispatch(loadLocalStorage(response[uid] ? response[uid] : []));
                dispatch(setTasksLoading(false));
              };
            });

            await get(child(ref(db), `categories/${id}`)).then((snapshot) => {
              if (snapshot.exists()) {
                const response = snapshot.val();
                setCategories(response[uid] ? response[uid] : categories);
              };
            });
          } catch (e) {
            console.error('Error adding document: ', e);
          }
        }
      });
    }
  }, [userLoginned]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.body.style.backgroundColor = '#1a2c4a';
    } else {
      document.body.style.backgroundColor = '#fff';
    }
  }, [theme]);

  useEffect(() => {
    if (!isAuth) {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
    setNoteGetDate(new Date().getDate().toString());
    setNoteGetMonts(new Date().getMonth().toString());
    setCurrentNotes(notes);
  }, [notes]);

  useEffect(() => {
    if (!isAuth) {
      localStorage.setItem('categories', JSON.stringify(categories));
      if (categories.length === 0) {
        setCategories([
          {
            icon: '#f50a0a',
            text: 'Личное',
          },
          {
            icon: '#31f3ca',
            text: 'Учеба',
          },
          {
            icon: '#31f34c',
            text: 'Повседневное',
          },
          {
            icon: '#b7b7b7',
            text: 'Без категории',
          },
        ]);
      }
    } else {
      set(ref(db, `categories/${id}`), categories);
    }
  }, [categories]);

  const onAddNote = (title: string, description: string, category: string, icon: string) => {
    if (description.length > 0 || title.length > 0) {
      const note = {
        id: Math.random().toString(16).slice(2),
        label: title || description.toString().replace(/( |<([^>]+)>)/gi, ''),
        description: description,
        day: noteGetDate,
        month: noteGetMonth,
        selected: false,
        categoryIcon: icon,
        category: category,
      };

      dispatch(addNote(note));

      if (isAuth) {
        update(ref(db, 'notes/' + id + '/' + note.id), note);
      }
    }

    dispatch(setRedact({
      visible: false,
      id: '',
      title: '',
      category: 'Без категории',
      categoryColor: '#b7b7b7',
      description: '',
    }));
  };

  const onUpdateNote = (noteId: string, title: string, description: string, category: string, icon: string) => {
    if (description.length > 0 || title.length > 0) {
      dispatch(
        updateNote({ noteId, title, description, category, icon, noteGetDate, noteGetMonth }),
      );

      if (isAuth) {
        update(ref(db, `notes/` + id + '/' + noteId), {
          category: category,
          categoryIcon: icon,
          day: noteGetDate,
          description: description,
          label: title,
          month: noteGetMonth,
        });
      }

      resetNoteStates();
    }
  };

  const resetNoteStates = () => {
    dispatch(setRedact({
      visible: false,
      id: '',
      title: '',
      categoryColor: '#b7b7b7',
      category: 'Без категории',
      description: '',
    }));
  };

  const onRemoveNote = () => {
    dispatch(removeNote({ noteRedactId }));
    if (isAuth) {
      remove(ref(db, `notes/` + id + '/' + noteRedactId));
    }
    resetNoteStates();
    setConfirmModal(false);
  };

  const onSelectNote = () => {
    dispatch(selectNote({ noteRedactId }));
    if (isAuth) {
      const selectedNote = notes.find((note) => note.id === noteRedactId);
      update(ref(db, `notes/` + id + '/' + noteRedactId), {
        selected: !selectedNote.selected,
      });
    }
  };

  const filterCategory = (textCategory: string) => {
    let categories = notes.filter((note) => note.category === textCategory);
    if (textCategory === 'Все заметки') {
      categories = notes;
    }
    if (textCategory === 'Избранное') {
      categories = notes.filter((note) => note.selected === true);
    }
    setCurrentNotes(categories);
  };

  let scrollPrev = window.pageYOffset;

  const hideElements = () => {
    const scrollTop = window.pageYOffset;

    if (scrollTop > 10 && scrollTop > scrollPrev) {
      setElementsHidden(true);
    } else {
      setElementsHidden(false);
    }

    scrollPrev = scrollTop;
  };

  if (window.innerWidth < 540) {
    window.addEventListener('scroll', hideElements);
  }

  return (
    <AppContext.Provider
      value={{
        onChangeStateTask,
        setCategories,
        onAddNote,
        onUpdateNote,
        resetNoteStates,
        filterCategory,
        onRemoveNote,
        onSelectNote,
        notes,
        elementsHidden,
        currentNotes,
        setConfirmModal,
        setTaskId,
        actionTooltip,
      }}>
      <div className={styles.todo} data-theme={theme}>
        <Header theme={theme} setDonatModal={setDonatModal} setCategories={setCategories} setUserLoginned={setUserLoginned}/>
        <Body
          noteRedact={noteRedact}
          filterItems={filterItems}
          categories={categories}
          noteRedactTitle={noteRedactTitle}
          noteRedactDescription={noteRedactDescription}
          confirmModal={confirmModal}
        />
        <Tooltip visible={dataSaveModal} text={tooltipText} image={tooltipImage} />
      </div>
    </AppContext.Provider>
  );
}

export default Home;
