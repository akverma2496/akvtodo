import React, { useState } from 'react';
import authStyles from './Auth.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../FirebaseConfig';

const Login = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState(true);
  const [successMsg, setSuccessMsg] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setMessage(false);
        setSuccessMsg('Logged in successfuly');
        setTimeout(() => {
          setSuccessMsg('');
          setMessage(true);
          navigate('/main');
        }, 2000)
      }).catch((error) => {
        setMessage(false);
        if (error.message === 'Firebase: Error (auth/invalid-email).') {
          setErrorMsg('Please fill all the fields');
        }
        else if (error.message === 'Firebase: Error (auth/user-not-found).') {
          setErrorMsg('User not found');
        }
        else if (error.message === 'Firebase: Error (auth/wrong-password).') {
          setErrorMsg('Incorrect password');
        }
        else {
          setErrorMsg('Something went wrong');
        }
        setTimeout(() => {
          setErrorMsg("");
          setMessage(true);
        }, 3000)
      })
  }

  return (
    <div className={authStyles.container}>
      <form className={authStyles.authForm} onSubmit={handleSubmit}>
        <p className={authStyles.paraLarge}>Login</p>

        {message && <div className={authStyles.invisible}></div>}
        {errorMsg && <div className={authStyles.invisibleRed}>{errorMsg}</div>}
        {successMsg && <div className={authStyles.invisibleGreen}>{successMsg}</div>}

        <input className={authStyles.genInput} type="email" placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} required spellCheck="false"/>
        <input className={authStyles.genInput} type="password" placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} required/>
        <input className={`${authStyles.specInput} , ${authStyles.genInput}`}
          type="submit" value='Login' />

        <p className={authStyles.paraSmall}>Don't have an account? <Link className='a' to='/register'>Register</Link></p>
      </form>
    </div>
  )
}

export default Login