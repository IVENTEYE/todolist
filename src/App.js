import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import blank from './img/blank-paper.png';
import Task from './components/Task';
import AppContext from './context';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useState(defaultDark ? 'dark' : 'light');
  const [taskGetDate, setTaskGetDate] = useState('');
  const [taskGetMonth, setTaskGetMonts] = useState('');

  const completedTasksDate = tasks.filter(task => task.checkState === true && task.dateVisible === true);
  const completedTasks = tasks.filter(task => task.checkState === true && task.dateVisible === false);
  const activeTasks = tasks.filter(task => task.checkState === false);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const theme = localStorage.getItem('theme');
    if (tasks) {
      setTasks(tasks);
    }
    if (theme) {
      setTheme(String(theme));
    }
    if (theme === 'dark') {
      document.body.style.backgroundColor = "#1a2c4a";
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setTaskGetDate(new Date().getDate());
    setTaskGetMonts(new Date().getMonth());
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.body.style.backgroundColor = "#1a2c4a";
    } else {
      document.body.style.backgroundColor = "#fff";
    }
  }, [theme]);

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
  return (
    <AppContext.Provider value={{ onChangeStateTask }}>
      <div className={styles.todo} data-theme={theme}>
        <header className={styles.todo__header}>
          <h1 className={styles.todo__headerTitle}>Список задач</h1>
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
          <div className={styles.todo__field}>
            <div className={styles.todo__fieldWrapper}>
              <input
                type="text"
                className={styles.todoInput}
                placeholder="Введите текст задачи..."
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addTask();
                  }
                }}
              />
              <button
                className={inputValue ? styles.clear + ' ' + styles.visible : styles.clear}
                onClick={() => setInputValue('')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" /></svg>
              </button>
            </div>
            <button
              type='button'
              className={styles.todoButton}
              onClick={() => {
                addTask();
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" /></svg>
            </button>
          </div>
          <div className={styles.todo__notes}>
            {tasks.length > 0 ? [...completedTasksDate,...activeTasks,...completedTasks].map(task => {
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
            }) :
              <div className={styles.notasks}>
                <div className={styles.notasks__wrapper}>
                  <div className={styles.notasks__image}>
                    <img src={blank} alt="Бланк" />
                  </div>
                  <h2 className={styles.notasks__title}>Задач нет</h2>
                  <p className={styles.notasks__text}>Добавьте задачу и она появится здесь.</p>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
