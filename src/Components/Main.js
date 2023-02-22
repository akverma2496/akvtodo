import React, { useState, useEffect, useRef } from 'react';
import authStyles from './Auth.module.css';
import mainStyles from './Main.module.css';
import addIcon from './images/add.png';
import Todos from './Todos';
import Modal from './Modal';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../FirebaseConfig';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { collection, query, where, getDocs } from "firebase/firestore";
import { uuidv4 } from '@firebase/util';
import { useNavigate } from 'react-router-dom';
import Empty from './Empty';
import { PuffLoader } from 'react-spinners';

const Main = () => {

  const [task, setTask] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [userEmail, setUserEmail] = useState();
  const [userData, setUserData] = useState([]);
  const [userName, setUsername] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [modal, setModal] = useState({
    logoutModal: false,
    viewModal: false,
    editModal: false,
    deleteModal: false,
    clearAllModal: false,
    id: "",
    task: ""
  })

  const logoutEvent = () => {
    setModal({ ...modal, logoutModal: true });
    setIsOpen(true);
  }

  const viewTaskModal = (task) => {
    setModal({ ...modal, viewModal: true, task: task });
    setIsOpen(true);
  }

  const editTaskModal = (id, task) => {
    setModal({ ...modal, editModal: true, id: id, task: task });
    setIsOpen(true);
  }

  const deleteTaskModal = (id, task) => {
    setModal({ ...modal, deleteModal: true, id: id, task: task });
    setIsOpen(true);
  }

  const ClearAllTaskModal = () => {
    setModal({ ...modal, clearAllModal: true });
    setIsOpen(true);
  }

  const displayUserName = (name) => {
    const finalName = name.split(' ')[0]
    setUsername(finalName);
  }

  setTimeout(() => {
    setLoading(false);
  }, 3000)

  useEffect(() => {
    console.log('useEffect of Main.js -> authcheck');
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        const getAllTheTasks = async () => {
          const q = query(collection(db, "users"), where("email", "==", user.email));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setUserData(doc.data().tasks);
            displayUserName(doc.data().name);
          });
        }
        getAllTheTasks();
      } else {
        setTimeout(() => {
          navigate('/login');
        }, 2000)
      }
    });
  }, [])

  const getAllTheTasks = async () => {
    const q = query(collection(db, "users"), where("email", "==", userEmail));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUserData(doc.data().tasks);
    });
  }

  const addTaskHandler = async () => {
    if (task.length > 0) {
      const userDocRef = doc(db, "users", userEmail);
      await updateDoc(userDocRef, {
        tasks: arrayUnion({ id: uuidv4(), taskItem: task })
      });
      setTask("");
      getAllTheTasks();
    } else {
      inputRef.current.focus()
    }
  }


  return (
    loading ? <div className={mainStyles.loader}><PuffLoader color="#626262" size={70} /></div> :

      <div className={authStyles.container}>

        <nav className={mainStyles.mainNav}>
          <h3>Hi, {userName}</h3>
          <span className={mainStyles.logoutLink} style={{ cursor: "pointer" }} onClick={logoutEvent}>Logout</span>
        </nav>

        <div className={mainStyles.inputContainer}>
          <input ref={inputRef} className={mainStyles.mainInput} type='text' placeholder='Add your task ...'
            value={task} onChange={(e) => setTask(e.target.value)} />
          <img alt="add" src={addIcon} className={mainStyles.inputAdd} onClick={addTaskHandler} />
        </div>

        <hr style={{ width: "95%", margin: "20px auto 0 auto" }} />

        {userData.length ?
          <Todos viewTask={viewTaskModal} editTask={editTaskModal} deleteTask={deleteTaskModal} userData={userData} userEmail={userEmail} />
          : <Empty />}

        {(userData.length > 1) && <div className={mainStyles.clearAll} onClick={ClearAllTaskModal}>Clear All</div>}

        {isOpen && <Modal setIsOpen={setIsOpen} modal={modal} setModal={setModal} userData={userData} setUserData={setUserData}
          userEmail={userEmail} setLoading={setLoading} />}
      </div>
  )
}

export default Main