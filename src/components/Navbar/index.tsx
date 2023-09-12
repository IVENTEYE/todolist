import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppContext from '../../context';
import { setValue } from '../../redux/slices/inputSlice.ts';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './index.module.scss'
import { RootState } from '../../redux/store';

const Navbar: React.FC<any> = ({ children }) => {
    const dispatch = useDispatch();
    const noteRedact = useSelector((state: RootState) => state.redact.visible);
    const [activeTab, setActiveTab] = useState(children[0].props.label);
    const { elementsHidden }: any = useContext(AppContext);

    const tabHandleClick = (newActiveTab: []) => {
        setActiveTab(newActiveTab);
    };

    useEffect(() => {
        const activeTab = localStorage.getItem('activeTab');

        if (activeTab) {
            setActiveTab(activeTab);
        }
    }, [])
    useEffect(() => {
        localStorage.setItem('activeTab', activeTab);
    }, [activeTab])

    return (
        <>
            <AnimatePresence mode='popLayout'>
                {children.map((content: any) => {
                    if (content.props.label === activeTab) {
                        return (
                            <motion.div initial={activeTab === 'Задачи' ? {left: '-80%', opacity: 0} : {left: "80%", opacity: 0}} animate={{left: '0%', transform: "none", opacity: 1}} exit={activeTab === 'Задачи' ? {left: '-80%', transform: "translateX(-80%)", opacity: 0} : {left: '80%', transform: "translateX(80%)", opacity: 0}} key={content.props.label} className={styles.todo__contentWrapper + ' ' + content.props.className}>{content.props.children}</motion.div>
                        )
                    }
                })}
            </AnimatePresence>
            {!noteRedact ?
                <nav className={ elementsHidden ? styles.navbar + ' hidden' : styles.navbar}>
                    <div className={styles.navbar__items}>
                        {children.map((tab: any) => {
                            const label = tab.props.label;
                            return (
                                <button
                                    key={label}
                                    className={label === activeTab ? styles.navbar__item + ' ' + styles._active : styles.navbar__item}
                                    onClick={() => {
                                        tabHandleClick(label);
                                        dispatch(setValue(''));
                                    }}
                                >
                                    <div className={styles.item__icon}>
                                        {tab.props.image}
                                    </div>
                                    <p className={styles.item__text}>{label}</p>
                                </button>
                            )
                        })}
                    </div>
                </nav> : null
            }
        </>
    )
}

export default Navbar