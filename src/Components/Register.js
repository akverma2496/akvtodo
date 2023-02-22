import React, { useState } from 'react';
import authStyles from './Auth.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../FirebaseConfig';
import { setDoc, doc } from 'firebase/firestore';

const Register = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [mobile, setMobile] = useState();
    const [name, setName] = useState();
    const [message, setMessage] = useState(true);
    const [successMsg, setSuccessMsg] = useState();
    const [errorMsg, setErrorMsg] = useState();
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                setDoc(doc(db, 'users', email), {
                    name: name, password: password,
                    mobile: mobile, email: email, tasks: []
                }).then(() => {
                    setMessage(false);
                    setSuccessMsg("Cheers, Account has been created");
                    setEmail("");
                    setPassword("");
                    setMobile("");
                    setName("");
                    setTimeout(() => {
                        setSuccessMsg("");
                        setMessage(true);
                        navigate('/login');
                    }, 3000)
                }).catch((error) => {
                    setMessage(false);
                    setErrorMsg(error.message);
                    setTimeout(() => {
                        setErrorMsg("");
                        setMessage(true);
                    }, 3000)
                })
            })
            .catch((error) => {
                setMessage(false);
                if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
                    setErrorMsg('Email already exists');
                }
                else{
                    setErrorMsg('Something went wrong');
                }
                setTimeout(() => {
                    setErrorMsg("");
                    setMessage(true);
                }, 3000)
            });
    }

    return (
        <div className={authStyles.container}>
            <form className={authStyles.authForm} onSubmit={handleSubmit}>
                <p className={authStyles.paraLarge}>Register</p>

                {message && <div className={authStyles.invisible}></div>}
                {errorMsg && <div className={authStyles.invisibleRed}>{errorMsg}</div>}
                {successMsg && <div className={authStyles.invisibleGreen}>{successMsg}</div>}

                <input className={authStyles.genInput} type="text" placeholder="Name"
                    maxLength="20" spellCheck="false" onChange={(e) => setName(e.target.value)} required/>
                <input className={authStyles.genInput} type="email" placeholder="Email"
                    spellCheck="false" onChange={(e) => setEmail(e.target.value)} required/>
                <input className={authStyles.genInput} type="password" placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)} required/>
                <input className={authStyles.genInput} type="tel" placeholder="Mobile"
                    maxLength="10" onChange={(e) => setMobile(e.target.value)} required/>
                <input className={`${authStyles.specInput} , ${authStyles.genInput}`} type="submit" value="Create"/>

                <p className={authStyles.pSmall}>Already have an account? <Link className='a' to='/login'>Login</Link></p>
            </form>
        </div>
    )
}

export default Register