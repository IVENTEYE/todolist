import React, { useState } from 'react';
import styles from './index.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/slices/userSlice.ts';
import { ReactComponent as EyeOpen } from '../../../icons/eye-regular.svg';
import { ReactComponent as EyeClose } from '../../../icons/eye-slash-regular.svg';
import { ReactComponent as Logo } from '../../../icons/logo.svg';

interface IForm {
  title: 'Войти' | 'Зарегистрироваться';
  formLabel: string;
  handleClick: (email: string, password: string) => void;
  errorText: string;
  setErrorText: (text: string) => void;
}

const Form: React.FC<IForm> = ({ title, formLabel, handleClick, errorText, setErrorText }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVidible, setPasswordVisible] = useState<"password" | "text">("password");
  

  const googleBtnClick = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const { email, refreshToken, uid } = result.user;
        dispatch(
          setUser({
            email: email,
            token: refreshToken,
            id: uid,
          }),
        );
        navigate('/');
      })
      .catch((error: Error) => console.error);
  };

  return (
    <div className={styles.form}>
      <div className={styles.formLogo}>
        <Logo width={50} height={50} />
      </div>
      <div className={styles.formContainer}>
        <h1 className={styles.form__title}>{formLabel}</h1>
        <button className={styles.googleBtn} onClick={googleBtnClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            role="img"
            className="icon ">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.64 9.20419C17.64 8.56601 17.5827 7.95237 17.4764 7.36328H9V10.8446H13.8436C13.635 11.9696 13.0009 12.9228 12.0477 13.561V15.8192H14.9564C16.6582 14.2524 17.64 11.9451 17.64 9.20419Z"
              fill="#4285F4"></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.99976 18C11.4298 18 13.467 17.1941 14.9561 15.8195L12.0475 13.5613C11.2416 14.1013 10.2107 14.4204 8.99976 14.4204C6.65567 14.4204 4.67158 12.8372 3.96385 10.71H0.957031V13.0418C2.43794 15.9831 5.48158 18 8.99976 18Z"
              fill="#34A853"></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.96409 10.7098C3.78409 10.1698 3.68182 9.59301 3.68182 8.99983C3.68182 8.40664 3.78409 7.82983 3.96409 7.28983V4.95801H0.957273C0.347727 6.17301 0 7.54755 0 8.99983C0 10.4521 0.347727 11.8266 0.957273 13.0416L3.96409 10.7098Z"
              fill="#FBBC05"></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.99976 3.57955C10.3211 3.57955 11.5075 4.03364 12.4402 4.92545L15.0216 2.34409C13.4629 0.891818 11.4257 0 8.99976 0C5.48158 0 2.43794 2.01682 0.957031 4.95818L3.96385 7.29C4.67158 5.16273 6.65567 3.57955 8.99976 3.57955Z"
              fill="#EA4335"></path>
          </svg>
          Войти с помощью Google
        </button>
        <hr className={styles.divider}></hr>
        <form>
          <div className={styles.form__fields}>
            <div className={styles.form__field}>
              <p className={styles.form__fieldLabel}>Адрес электронной почты</p>
              <input
                style={{ display: 'block' }}
                className={errorText === "user-not-found" || errorText === "invalid-email" ? styles.form__fieldInput + ' ' + styles.wrong : styles.form__fieldInput}
                type="email"
                placeholder="Введите e-mail"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorText) {
                    setErrorText('');
                  }
                }}
                required
              />
              {errorText === "user-not-found" ? <small className={styles.error}>Пользователь не найден</small> : null}
              {errorText === "invalid-email" ? <small className={styles.error}>Введен неверный email</small> : null}
            </div>
            <div className={styles.form__field}>
              <p className={styles.form__fieldLabel}>Пароль</p>
              <input
                style={{ display: 'block' }}
                className={errorText === "wrong-password" || errorText === "weak-password" ? styles.form__fieldInput + ' ' + styles.wrong : styles.form__fieldInput}
                type={passwordVidible}
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorText) {
                    setErrorText('');
                  }
                }}
                required
              />
              {password && (
                <button 
                  type='button'
                  className={styles.passwordBtn}
                  onClick={() => {
                    if (passwordVidible === 'password') {
                      setPasswordVisible("text");
                    } else if (passwordVidible === 'text') {
                      setPasswordVisible("password");
                    }
                  }}
                >
                  {passwordVidible === 'password' ? <EyeOpen width={20} fill="#999" /> : <EyeClose width={20} fill="#999" />} 
                </button>
              )}
            </div>
          </div>
          {errorText === "wrong-password" ? <small className={styles.error}>Неверный пароль</small> : null}
          {errorText === "weak-password" ? <small className={styles.error}>Пароль должен содержать не менее 6 символов</small> : null}
          <input
            className={styles.form__btn}
            type="submit"
            value={title}
            onClick={(e) => {
              e.preventDefault();
              handleClick(email, password);
            }}
          />
        </form>
        <div className={styles.authLink}>
          <p>{title === 'Войти' ? 'Еще нет аккаунта?' : 'Уже есть аккаунт?'}</p>
          &nbsp;
          {title === 'Войти' ? (
            <Link to="/register">Создайте сейчас</Link>
          ) : (
            <Link to="/login">Войдите</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
