import React from 'react';
import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import AppContext from './context';
import Header from './components/Header/index.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { onChangeStateItem } from './redux/slices/tasksSlice';
import { setTheme } from './redux/slices/themeSlice';
import { setRedactCategory, setRedactColor, setRedactDescription, setRedactId, setRedactTitle, setRedactVisible, } from './redux/slices/noteRedactSlice';
import { addNote, localStorageNotes, removeNote, selectNote, updateNote, } from './redux/slices/notesSlice';
import Body from './components/Body/index.tsx';

const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const [elementsHidden, setElementsHidden] = useState(false);
  const notes = useSelector((state) => state.notes.items);
  const noteRedact = useSelector((state) => state.redact.visible);
  const noteRedactId = useSelector((state) => state.redact.id);
  const noteRedactTitle = useSelector((state) => state.redact.title);
  const noteRedactDescription = useSelector((state) => state.redact.description);
  const [noteGetDate, setNoteGetDate] = useState('');
  const [noteGetMonth, setNoteGetMonts] = useState('');
  const [currentNotes, setCurrentNotes] = useState(notes);

  const [confirmModal, setConfirmModal] = useState(false);
  const [donatModal, setDonatModal] = useState(false);
  const [thanksDonatModal, setThanksDonatModal] = useState(false);
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

  useEffect(() => {
    dispatch(setTheme(defaultDark ? 'dark' : 'light'));
    const storageTheme = localStorage.getItem('theme');

    if (storageTheme) {
      dispatch(setTheme(String(storageTheme)));
    }
    if (storageTheme === 'dark') {
      document.body.style.backgroundColor = '#1a2c4a';
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.body.style.backgroundColor = '#1a2c4a';
    } else {
      document.body.style.backgroundColor = '#fff';
    }
  }, [theme]);

  const onChangeStateTask = (id, state) => {
    dispatch(onChangeStateItem({ id, state }));
  };

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('notes'));
    const categories = JSON.parse(localStorage.getItem('categories'));
    // const firstShowModal = Boolean(localStorage.getItem('firstShowModal'));
    if (notes) {
      dispatch(localStorageNotes(notes));
    }
    if (categories) {
      setCategories(categories);
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
    localStorage.setItem('notes', JSON.stringify(notes));
    setNoteGetDate(new Date().getDate());
    setNoteGetMonts(new Date().getMonth());
    setCurrentNotes(notes);
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const onAddNote = (title, description, category, icon) => {
    if (description.length > 0 || title.length > 0) {
      const note = {
        id: Math.random().toString(16).slice(2),
        label: title || description.toString().replace(/( |<([^>]+)>)/ig, ""),
        description: description,
        day: noteGetDate,
        month: noteGetMonth,
        selected: false,
        categoryIcon: icon,
        category: category,
      };
      dispatch(addNote(note));
      // setNotes((prev) => [
      //   {
      //     id: Math.random().toString(16).slice(2),
      //     label: title || description,
      //     description: description,
      //     day: noteGetDate,
      //     month: noteGetMonth,
      //     selected: false,
      //     categoryIcon: icon,
      //     category: category,
      //   },
      //   ...prev,
      // ]);
    }
    dispatch(setRedactVisible(false));
  };

  const onUpdateNote = (id, title, description, category, icon) => {
    if (description.length > 0 || title.length > 0) {
      dispatch(updateNote({ id, title, description, category, icon, noteGetDate, noteGetMonth }));
      // setNotes((prev) =>
      //   prev.map((note) => {
      //     if (note.id === id) {
      //       return {
      //         ...note,
      //         day: noteGetDate,
      //         month: noteGetMonth,
      //         label: title || description,
      //         description: description,
      //         categoryIcon: icon,
      //         category: category,
      //       };
      //     }
      //     return note;
      //   }),
      // );
      resetNoteStates();
    }
  };

  const resetNoteStates = () => {
    dispatch(setRedactVisible(false));
    dispatch(setRedactId(''));
    dispatch(setRedactTitle(''));
    dispatch(setRedactDescription(''));
    dispatch(setRedactColor('#b7b7b7'));
    dispatch(setRedactCategory('Без категории'));
  };

  const onRemoveNote = () => {
    // setNotes((prev) => prev.filter((note) => note.id !== noteRedactId));
    dispatch(removeNote({ noteRedactId }));
    resetNoteStates();
    setConfirmModal(false);
  };

  const onSelectNote = () => {
    dispatch(selectNote({ noteRedactId }));
    // setNotes((prev) =>
    //   prev.map((note) => {
    //     if (note.id === noteRedactId) {
    //       return {
    //         ...note,
    //         selected: note.selected === false ? true : false,
    //       };
    //     }
    //     return note;
    //   }),
    // );
  };

  const filterCategory = (textCategory) => {
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
    <AppContext.Provider value={{ onChangeStateTask, setCategories, onAddNote, onUpdateNote, resetNoteStates, filterCategory, onRemoveNote, onSelectNote, notes, elementsHidden, currentNotes, setConfirmModal, }}>
      <div className={styles.todo} data-theme={theme}>
        <Header theme={theme} setDonatModal={setDonatModal} />
        <Body noteRedact={noteRedact} filterItems={filterItems} categories={categories} noteRedactTitle={noteRedactTitle} noteRedactDescription={noteRedactDescription} confirmModal={confirmModal} />
      </div>
    </AppContext.Provider>
  );
}

export default App;
