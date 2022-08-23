import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import AppContext from '../../context';
import styles from './index.module.scss'


function Navbar({ children }) {
    const [activeTab, setActiveTab] = useState(children[1].props.label);
    const { setInputValue, noteRedact, elementsHidden } = useContext(AppContext);
    const tabHandleClick = (newActiveTab) => {
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
            {children.map(content => {
                if (content.props.label === activeTab) {
                    return <div key={content.props.label} className={styles.todo__contentWrapper + ' ' + content.props.className}>{content.props.children}</div>
                }
            })}
            {!noteRedact ?
                <nav className={ elementsHidden ? styles.navbar + ' hidden' : styles.navbar}>
                    <div className={styles.navbar__items}>
                        {children.map(tab => {
                            const label = tab.props.label;
                            return (
                                <button
                                    key={label}
                                    className={label === activeTab ? styles.navbar__item + ' ' + styles._active : styles.navbar__item}
                                    onClick={() => {
                                        tabHandleClick(label)
                                        setInputValue('');
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