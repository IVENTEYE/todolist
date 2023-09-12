import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setValue } from '../../redux/slices/inputSlice.ts';
import styles from './index.module.scss'

type FieldPropsType = {
    action?: () => void;
    setButton?: boolean;
    placeholder: string;
    className?: string;
    type?: string;
}

const Field: React.FC<FieldPropsType> = ({ action, setButton, placeholder, className, type = 'text' }) => {
    const inputValue = useSelector((state: any) => state.input.value);
    const dispatch = useDispatch();
    return (
        <div className={styles.todo__field + ' ' + className} style={!setButton ? {gridTemplateColumns: 'calc(100% - 3px)'} : undefined}>
            <div className={styles.todo__fieldWrapper}>
                <input
                    name={type}
                    type={type}
                    className={styles.todoInput}
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={(e) => {
                        dispatch(setValue(e.target.value));
                    }}
                    onKeyDown={setButton ? (e) => {
                        if (e.key === 'Enter') {
                            if (action) {
                                action();
                            }
                        }
                    } : undefined}
                    style={!setButton ? {borderRadius: '3px'} : undefined}
                />
                <button
                    className={inputValue ? styles.clear + ' ' + styles.visible : styles.clear}
                    onClick={() => dispatch(setValue(''))}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" /></svg>
                </button>
            </div>
            {setButton &&
                <button
                    type='button'
                    className={styles.todoButton}
                    onClick={() => {
                        if (action) {
                            action();
                        }
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" /></svg>
                </button>
            }
        </div>
    )
}

export default Field