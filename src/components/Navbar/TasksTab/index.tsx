import React from 'react';
import Field from '../../Field/index.tsx';
import { AnimatePresence } from 'framer-motion';
import Task from '../../Task/index.tsx';
import Placeholder from '../../Placeholder/index.tsx';
import { useSelector } from 'react-redux';
import { setValue } from '../../../redux/slices/inputSlice.ts';
import styles from './index.module.scss'
import { RootState } from '../../../redux/store/index.js';
import Loading from '../../Loading/index.tsx';

type TasksTabProps = {
    fieldAction: () => void;
    taskRemove: (id: string, dateVisible: boolean) => void;
    taskUpdate: (id: string, value: string) => void;
};

type TasksItemsType = {
    id: string;
    checkState: boolean;
    title: string;
    day: string;
    month: string;
    dateVisible: boolean;
    taskRemove: (id: string, dateVisible: boolean) => void;
    taskUpdate: (id: string, title: string) => void;
    task: {};
}

const TasksTab: React.FC<TasksTabProps> = ({ fieldAction, taskRemove, taskUpdate }) => {
  const tasks = useSelector((state: RootState) => state.tasks.items);
  const tasksLoading = useSelector((state: RootState) => state.tasks.isLoading);
  return (
    <>
      <Field action={fieldAction} setButton placeholder="Введите текст задачи..."/>
      <div className={styles.tasksWrapper}>
        <AnimatePresence mode="popLayout">
          {tasksLoading ? <Loading text='Загрузка задач...'/> : tasks.length > 0 ? (
            tasks.map((task: TasksItemsType) => {
              return (
                <Task
                  key={task.id}
                  checkState={task.checkState}
                  title={task.title}
                  taskDay={task.day}
                  taskMonth={task.month}
                  taskDateVisible={task.dateVisible}
                  onRemove={taskRemove}
                  onUpdate={taskUpdate}
                  taskObj={task}
                />
              );
            })
          ) : (
            <Placeholder
              image="img/blank-paper.png"
              title="Задач нет"
              text="Добавьте задачу и она появится здесь."
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default TasksTab;
