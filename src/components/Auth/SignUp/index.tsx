import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Form from '../Form/index.tsx';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setUser } from '../../../redux/slices/userSlice.ts'

const SignUp: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [errorText, setErrorText] = useState('');

    const handleSignUp = (email: string, password: string) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                console.log(user);
                dispatch(setUser({
                    email: user.email,
                    token: user.accessToken,
                    id: user.uid,
                }));
                navigate("/");
            })
            .catch(error => {
              console.error(error);
              setErrorText(error.code.slice(5));
            });
    }

  return (
    <Form 
      title='Зарегистрироваться' 
      formLabel="Заригестрируйтесь" 
      handleClick={handleSignUp} 
      errorText={errorText} 
      setErrorText={setErrorText}
    />
  )
}

export default SignUp