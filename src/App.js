import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import Task from './components/Task';
import AppContext from './context';
import Field from './components/Field';
import Navbar from './components/Navbar';
import Placeholder from './components/Placeholder';
import Note from './components/Note';
import NoteRedact from './components/NoteRedact';
import Toolbar from './components/Toolbar';
import NotesSort from './components/NotesSort';
import Categories from './components/Categories';

function App() {
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [currentNotes, setCurrentNotes] = useState(notes);
  const [inputValue, setInputValue] = useState('');
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useState(defaultDark ? 'dark' : 'light');
  const [taskGetDate, setTaskGetDate] = useState('');
  const [taskGetMonth, setTaskGetMonts] = useState('');
  const [noteGetDate, setNoteGetDate] = useState('');
  const [noteGetMonth, setNoteGetMonts] = useState('');
  const [noteRedact, setNoteRedact] = useState(false);
  const [noteRedactId, setNoteRedactId] = useState('');
  const [noteRedactTitle, setNoteRedactTitle] = useState('');
  const [categoryColor, setCategoryColor] = useState('#b7b7b7');
  const [noteRedactCategory, setNoteRedactCategory] = useState('Без категории');
  const [noteRedactDescription, setNoteRedactDescription] = useState('');
  const [elementsHidden, setElementsHidden] = useState(false);
  const filterItems = [
    {
      icon: <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1 6V21.0013C1 21.5614 1.45107 22 2.00748 22H16V17.0059C16 15.8866 16.8945 15 17.9979 15H22V6H1ZM1 5V1.99875C1 1.44715 1.43861 1 1.99875 1H21.0013C21.5528 1 22 1.44995 22 2.00685V5H1ZM16.5 23H2.00011C0.895478 23 0 22.0984 0 20.9991V2.00086C0 0.895817 0.901627 0 2.00086 0H20.9991C22.1042 0 23 0.894514 23 1.99406V15.5V16L17 23H16.5ZM17 21.5V17.0088C17 16.4516 17.4507 16 17.9967 16H21.7L17 21.5ZM3 9V10H20V9H3ZM3 12V13H20V12H3ZM3 15V16H14V15H3ZM3 18V19H14V18H3Z" fill="#b7b7b7" /></svg>,
      text: 'Все заметки'
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill='#b7b7b7' d="M287.9 0C297.1 0 305.5 5.25 309.5 13.52L378.1 154.8L531.4 177.5C540.4 178.8 547.8 185.1 550.7 193.7C553.5 202.4 551.2 211.9 544.8 218.2L433.6 328.4L459.9 483.9C461.4 492.9 457.7 502.1 450.2 507.4C442.8 512.7 432.1 513.4 424.9 509.1L287.9 435.9L150.1 509.1C142.9 513.4 133.1 512.7 125.6 507.4C118.2 502.1 114.5 492.9 115.1 483.9L142.2 328.4L31.11 218.2C24.65 211.9 22.36 202.4 25.2 193.7C28.03 185.1 35.5 178.8 44.49 177.5L197.7 154.8L266.3 13.52C270.4 5.249 278.7 0 287.9 0L287.9 0zM287.9 78.95L235.4 187.2C231.9 194.3 225.1 199.3 217.3 200.5L98.98 217.9L184.9 303C190.4 308.5 192.9 316.4 191.6 324.1L171.4 443.7L276.6 387.5C283.7 383.7 292.2 383.7 299.2 387.5L404.4 443.7L384.2 324.1C382.9 316.4 385.5 308.5 391 303L476.9 217.9L358.6 200.5C350.7 199.3 343.9 194.3 340.5 187.2L287.9 78.95z" /></svg>,
      text: 'Избранное'
    }
  ];
  const [categories, setCategories] = useState([
    {
      icon: '#f50a0a',
      text: 'Личное'
    },
    {
      icon: '#31f3ca',
      text: 'Учеба'
    },
    {
      icon: '#31f34c',
      text: 'Повседневное'
    },
    {
      icon: '#b7b7b7',
      text: 'Без категории'
    },
  ]);

  const selectedNotes = currentNotes.filter(note => note.selected === true);
  const defaultNotes = currentNotes.filter(note => note.selected === false);
  const filteredNotes = [...selectedNotes, ...defaultNotes].filter(note => note.label.toLowerCase().includes(inputValue.toLowerCase()));

  let scrollPos = 60;

  const hideElements = () => {
    const scrollTop = window.pageYOffset;
    console.log(elementsHidden);

    if (scrollTop < scrollPos) {
      setElementsHidden(false);
    } else {
      setElementsHidden(true);
    }
    scrollPos = scrollTop;
  }

  // window.addEventListener('scroll', hideElements);

  const onRedactNote = (id, title, description, category, icon) => {
    setNoteRedact(true);
    setNoteRedactId(id);
    setNoteRedactTitle(title);
    setCategoryColor(icon);
    setNoteRedactCategory(category);
    setNoteRedactDescription(description);
  }
  const notesMapped = currentNotes.length > 0 ? filteredNotes.length > 0 ? filteredNotes.map(note => {
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
      />
    )
  }) : <Placeholder
    image="/todolist/img/noNotes.svg"
    title="Ничего не найдено"
    text="Не удалось найти заметку с введённым названием."
  />
    : <Placeholder
      image="/todolist/img/noNotes.svg"
      title="Заметок нет"
      text="Добавьте заметку и она появится здесь."
    />;

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const notes = JSON.parse(localStorage.getItem('notes'));
    const theme = localStorage.getItem('theme');
    const categories = JSON.parse(localStorage.getItem('categories'));
    if (tasks) {
      setTasks(tasks);
    }
    if (notes) {
      setNotes(notes);
    }
    if (categories) {
      setCategories(categories);
    }
    if (theme) {
      setTheme(String(theme));
    }
    if (theme === 'dark') {
      document.body.style.backgroundColor = "#1a2c4a";
    }
    setCurrentNotes(notes);

    // Добавление категории заметкам, созданным без категории
    const checkCategory = notes.filter(note => !note.category && !note.categoryIcon);
    if (checkCategory.length > 0) {
      setNotes(prev => [...prev.filter(note => note.category && note.categoryIcon), ...prev.filter(note => !note.category && !note.categoryIcon).map(note => {
        return {
          ...note,
          categoryIcon: '#b7b7b7',
          category: 'Без категории'
        }
      })]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setTaskGetDate(new Date().getDate());
    setTaskGetMonts(new Date().getMonth());
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
    setNoteGetDate(new Date().getDate());
    setNoteGetMonts(new Date().getMonth());
    setCurrentNotes(notes);
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.body.style.backgroundColor = "#1a2c4a";
    } else {
      document.body.style.backgroundColor = "#fff";
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

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
      setTasks(prev => [task, ...prev.map(task => {
        if (String(task.day) === String(new Date().getDate()) && String(task.month) === String(new Date().getMonth())) {
          return {
            ...task,
            dateVisible: false,
          }
        }
        return task
      })]);
      setInputValue('');
    }
  }

  const onRemoveTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }

  const onChangeStateTask = (id, state) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        return {
          ...task,
          checkState: !state
        }
      }
      return task
    }));
  }

  const onUpdateTask = (id, title) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        return {
          ...task,
          title: title
        }
      }
      return task
    }));
  }

  const onAddNote = (title, description, category, icon) => {
    if (description.length > 0 || title.length > 0) {
      setNotes(prev => [
        {
          id: Math.random().toString(16).slice(2),
          label: title.length === 0 ? description : title,
          description: description,
          day: noteGetDate,
          month: noteGetMonth,
          selected: false,
          categoryIcon: icon,
          category: category
        }, ...prev
      ]);
    }
    setNoteRedact(false);
  }

  const resetNoteStates = () => {
    setNoteRedact(false);
    setNoteRedactId('');
    setNoteRedactTitle('');
    setNoteRedactDescription('');
    setCategoryColor('#b7b7b7');
    setNoteRedactCategory('Без категории');
  }

  const onUpdateNote = (id, title, description, category, icon) => {
    if (description.length > 0 || title.length > 0) {
      setNotes(prev => prev.map(note => {
        if (note.id === id) {
          return {
            ...note,
            day: noteGetDate,
            month: noteGetMonth,
            label: title,
            description: description,
            categoryIcon: icon,
            category: category
          }
        }
        return note
      }));
      resetNoteStates();
    }
  }

  const onRemoveNote = () => {
    setNotes(prev => prev.filter(note => note.id !== noteRedactId));
    resetNoteStates();
  }

  const onSelectNote = () => {
    setNotes(prev => prev.map(note => {
      if (note.id === noteRedactId) {
        return {
          ...note,
          selected: note.selected === false ? true : false
        }
      }
      return note
    }));
  }

  const filterCategory = (textCategory) => {
    let categories = notes.filter(note => note.category === textCategory);
    if (textCategory === "Все заметки") {
      categories = notes;
    }
    if (textCategory === "Избранное") {
      categories = notes.filter(note => note.selected === true);
    }
    setCurrentNotes(categories);
  }

  return (
    <AppContext.Provider value={{ onChangeStateTask, inputValue, setInputValue, noteRedact, setCategories, onAddNote, onUpdateNote, resetNoteStates, noteRedactId, noteRedactTitle, categoryColor, noteRedactCategory, filterCategory, noteRedactDescription, onRemoveNote, onSelectNote, notes, setNotes, elementsHidden, currentNotes }}>
      <div className={styles.todo} data-theme={theme}>
        <header className={styles.todo__header}>
          <h1 className={styles.todo__headerTitle}>Todo</h1>
          <button
            className={theme === "light" ? styles.themeButton + ' ' + styles.themeButtonMoon + ' ' + styles.active : styles.themeButton + ' ' + styles.themeButtonMoon}
            onClick={() => setTheme("dark")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M32 256c0-123.8 100.3-224 223.8-224c11.36 0 29.7 1.668 40.9 3.746c9.616 1.777 11.75 14.63 3.279 19.44C245 86.5 211.2 144.6 211.2 207.8c0 109.7 99.71 193 208.3 172.3c9.561-1.805 16.28 9.324 10.11 16.95C387.9 448.6 324.8 480 255.8 480C132.1 480 32 379.6 32 256z" /></svg>
          </button>
          <button
            className={theme === "dark" ? styles.themeButton + ' ' + styles.themeButtonSun + ' ' + styles.active : styles.themeButton + ' ' + styles.themeButtonSun}
            onClick={() => setTheme("light")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 159.1c-53.02 0-95.1 42.98-95.1 95.1S202.1 351.1 256 351.1s95.1-42.98 95.1-95.1S309 159.1 256 159.1zM509.3 347L446.1 255.1l63.15-91.01c6.332-9.125 1.104-21.74-9.826-23.72l-109-19.7l-19.7-109c-1.975-10.93-14.59-16.16-23.72-9.824L256 65.89L164.1 2.736c-9.125-6.332-21.74-1.107-23.72 9.824L121.6 121.6L12.56 141.3C1.633 143.2-3.596 155.9 2.736 164.1L65.89 256l-63.15 91.01c-6.332 9.125-1.105 21.74 9.824 23.72l109 19.7l19.7 109c1.975 10.93 14.59 16.16 23.72 9.824L256 446.1l91.01 63.15c9.127 6.334 21.75 1.107 23.72-9.822l19.7-109l109-19.7C510.4 368.8 515.6 356.1 509.3 347zM256 383.1c-70.69 0-127.1-57.31-127.1-127.1c0-70.69 57.31-127.1 127.1-127.1s127.1 57.3 127.1 127.1C383.1 326.7 326.7 383.1 256 383.1z" /></svg>
          </button>
        </header>
        <div className={styles.todo__body}>
          <div className={styles.todo__content} style={noteRedact ? { marginBottom: '0px' } : null}>
            <Navbar>
              {/* Tasks tab */}
              <div
                className={styles.todo__tasks}
                label="Задачи"
                image={[<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12.5" cy="12.5" r="12" stroke="#b7b7b7" /><path d="M18.7279 8.26412C19.0907 8.61572 19.0907 9.18391 18.7279 9.53551L11.299 16.7363C10.9362 17.0879 10.35 17.0879 9.98728 16.7363L6.27197 13.1359C5.90934 12.7843 5.90934 12.2161 6.27197 11.8645C6.63466 11.5129 7.22259 11.5129 7.58533 11.8645L10.617 14.8264L17.4163 8.26412C17.779 7.91196 18.3652 7.91196 18.7279 8.26412Z" fill="#b7b7b7" /></svg>]}
              >
                <Field action={addTask} setButton placeholder="Введите текст задачи..." />
                {tasks.length > 0 ? tasks.map(task => {
                  return (
                    <Task
                      key={task.id}
                      checkState={task.checkState}
                      title={task.title}
                      taskDay={task.day}
                      taskMonth={task.month}
                      taskDateVisible={task.dateVisible}
                      onRemove={onRemoveTask}
                      onUpdate={onUpdateTask}
                      taskObj={task}
                    />
                  )
                }) : <Placeholder
                  image="/todolist/img/blank-paper.png"
                  title="Задач нет"
                  text="Добавьте задачу и она появится здесь."
                />
                }
              </div>
              {/* Notes tab */}
              <div
                className={styles.todo__notes}
                label="Заметки"
                image={[<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1 6V21.0013C1 21.5614 1.45107 22 2.00748 22H16V17.0059C16 15.8866 16.8945 15 17.9979 15H22V6H1ZM1 5V1.99875C1 1.44715 1.43861 1 1.99875 1H21.0013C21.5528 1 22 1.44995 22 2.00685V5H1ZM16.5 23H2.00011C0.895478 23 0 22.0984 0 20.9991V2.00086C0 0.895817 0.901627 0 2.00086 0H20.9991C22.1042 0 23 0.894514 23 1.99406V15.5V16L17 23H16.5ZM17 21.5V17.0088C17 16.4516 17.4507 16 17.9967 16H21.7L17 21.5ZM3 9V10H20V9H3ZM3 12V13H20V12H3ZM3 15V16H14V15H3ZM3 18V19H14V18H3Z" fill="#b7b7b7" /></svg>]}
              >
                {!noteRedact ? (notes.length >= 2 ? <Field className={styles.noteField} placeholder="Поиск заметок" /> : null) : null}
                {!noteRedact ?
                  <div className={styles.notesInfo}>
                    {notes.length > 0 && inputValue === '' ?
                      <>
                        <div className={styles.noteCounter}>Всего заметок: {notes.length}</div>
                        {notes.length > 1 && <Categories filter={filterItems} categories={categories} onFilter={filterCategory}/>}
                      </> : null
                    }
                  </div>
                  : null
                }
                {!noteRedact ? notesMapped : <NoteRedact redactCategories={categories}/>}
                {!noteRedact ?
                  <button className={currentNotes.length > 4 ? styles.addBtn + ' ' + styles._sticky : styles.addBtn} onClick={() => setNoteRedact(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" /></svg>
                  </button>
                  : null}
              </div>
            </Navbar>
            {/* Toolbar */}
            {noteRedact && (noteRedactTitle !== '' || noteRedactDescription !== '') ? <Toolbar /> : null}
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
