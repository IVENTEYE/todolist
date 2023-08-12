import React, { useState } from 'react'
import checkContext from '../../checkContext';
import Checkbox from '../Checkbox/index.tsx'
import TheDate from '../Date/index.tsx';
import styles from "./index.module.scss"
import { motion } from "framer-motion"

type TaskObjType = {
    id: string;
    title: string;
    dateVisible: boolean;
    day: string;
    month: string;
    checkState: boolean;
}

type TaskPropsType = {
    checkState: boolean;
    title: string;
    taskDay: string;
    taskMonth: string;
    taskDateVisible: boolean;
    taskObj: TaskObjType;
    onRemove: (id: string, dateVisible: boolean) => void;
    onUpdate: (id: string, title: string) => void;
}

const Task: React.FC<TaskPropsType> = ({ checkState = false, title, taskDay, taskMonth, taskDateVisible = true, taskObj, onRemove, onUpdate }) => {
    const [taskState, setTaskState] = useState(checkState);
    const [inputRedactValue, setInputRedactValue] = useState('');
    const [inputRedactVisible, setInputRedactVisible] = useState(false);

    const onRedact = (title: string) => {
        setInputRedactValue(title);
        setInputRedactVisible(!inputRedactVisible);
    }
    const taskAnimation = {
        initial: {
          opacity: 0,
          transform: 'translateY(-15px)',
        },
        animate: {
          opacity: 1,
          transform: 'translateY(0px)',
        },
        exit: {
          opacity: 0,
          transform: 'translateY(-15px)',
        }
      };
    return (
        <checkContext.Provider value={{ taskState, setTaskState }}>
            { taskDateVisible ? <TheDate createdDay={taskDay} createdMonth={taskMonth}/> : null}
                <motion.div {...taskAnimation} transition={{duration: 0.25}} className={taskState ? styles.task + ' ' + styles.taskComplete : styles.task}>
                    <Checkbox taskObj={taskObj} />
                    {inputRedactVisible ?
                        <input
                            type="text"
                            className={styles.task__input}
                            onChange={(e) => {
                                setInputRedactValue(e.target.value);
                            }}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    onUpdate(taskObj.id, inputRedactValue);
                                    setInputRedactVisible(!inputRedactVisible);
                                }
                            }}
                            value={inputRedactValue}
                        />
                        : <h2 className={styles.task__title}>{title}</h2>
                    }
                    <div className={styles.task__actions}>
                        {inputRedactVisible ?
                            <button
                                type='button'
                                className={styles.task__action + ' ' + styles.task__action_confirm}
                                onClick={() => {
                                    onUpdate(taskObj.id, inputRedactValue);
                                    setInputRedactVisible(!inputRedactVisible);
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z" /></svg>
                            </button> :
                            <button
                                type='button'
                                className={styles.task__action + ' ' + styles.task__action_redact}
                                onClick={() => {
                                    onRedact(taskObj.title);
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32zM421.7 220.3L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3z" /></svg>
                            </button>}
                        <button
                            type='button'
                            className={styles.task__action + ' ' + styles.task__action_remove}
                            onClick={() => onRemove(taskObj.id, taskObj.dateVisible)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z" /></svg>
                        </button>
                    </div>
                </motion.div>
        </checkContext.Provider>
    )
}

export default Task