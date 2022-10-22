import React from 'react'
import { useState, useEffect } from 'react'
import Button from '../Button'
import styles from './index.module.scss'

function Prompt({ image, text }) {
    const [promptVisible, setPromptVisible] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [userChoice, setUserChoise] = useState(null);

    const closePrompt = () => {
        setPromptVisible(false);
        setDeferredPrompt(null);
        setUserChoise('dismissed');
    };

    useEffect(() => {
        const userCh = JSON.parse(localStorage.getItem('userChoice'));
        if (userCh) {
            setUserChoise(userCh);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('userChoice', JSON.stringify(userChoice));

        if (userChoice !== 'dismissed') {
            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                setDeferredPrompt(e);
                setTimeout(() => {
                    setPromptVisible(true);
                }, 5000);
            });
        } else {
            window.addEventListener('beforeinstallprompt', (e) => {
                setTimeout(() => {
                    closePrompt();
                }, 5000);
            });
        }
    }, [userChoice]);

    window.addEventListener('appinstalled', () => {
        // Hide the app-provided install promotion
        setPromptVisible(false);
        // Clear the deferredPrompt so it can be garbage collected
        setDeferredPrompt(null);
    });

    const installApp = async (target) => {
        if (!target.closest('svg')) {
            setPromptVisible(false);
            // Show the install prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            const { outcome } = await deferredPrompt.userChoice;
            setUserChoise(outcome);
            console.log(outcome);
            // We've used the prompt, and can't use it again, throw it away
            setDeferredPrompt(null);
        }
    };

    return (
        <div
            className={promptVisible ? styles.prompt + ' ' + styles._active : styles.prompt}
            onClick={(e) => {
                installApp(e.target)
            }}>
            <div className={styles.prompt__body}>
                <div className={styles.prompt__items}>
                    <div className={styles.prompt__image}>
                        <img src={image} alt="" />
                    </div>
                    <div className={styles.prompt__content}>
                        <div className={styles.prompt__text}>{text}</div>
                        <div
                            className={styles.prompt__close}
                            onClick={closePrompt}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" /></svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Prompt