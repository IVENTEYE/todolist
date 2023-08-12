import React from 'react';
import Field from '../../Field/index.tsx';
import { AnimatePresence } from 'framer-motion';
import Task from '../../Task/index.tsx';
import Placeholder from '../../Placeholder/index.tsx';
import { useSelector } from 'react-redux';

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
  const tasks = useSelector((state: any) => state.tasks.items);
  return (
    <>
      <Field action={fieldAction} setButton placeholder="Введите текст задачи..." />
      <AnimatePresence mode="popLayout">
        {tasks.length > 0 ? (
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
    </>
  );
};

export default TasksTab;
