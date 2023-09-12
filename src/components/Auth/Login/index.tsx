import React, { useState, useEffect } from 'react';
import { User, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import Form from '../Form/index.tsx';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../../redux/slices/userSlice.ts';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    console.log(errorText);
  }, [errorText])

  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            token: user.refreshToken,
            id: user.uid,
          }),
        );
        navigate('/');
      })
      .catch(error => {
        setErrorText(error.code.slice(5));
      });
  };

  return <Form 
    title="Войти" 
    formLabel="Войдите в аккаунт" 
    handleClick={handleLogin} 
    errorText={errorText}
    setErrorText={setErrorText}
  />;
};

export default Login;
