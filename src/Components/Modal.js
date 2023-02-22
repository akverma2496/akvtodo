import React, { useState, useRef } from "react";
import styles from "./Modal.module.css";
import { useNavigate } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth, db } from '../FirebaseConfig';
import { doc, updateDoc, arrayRemove, query, collection, where, getDocs, arrayUnion } from "firebase/firestore";

const Modal = ({ setIsOpen, modal, setUserData, userEmail }) => {

    const userDocRef = doc(db, "users", userEmail);
    const [editItem, setEditItem] = useState(modal.task);
    const inputRef = useRef(null);

    const closeLogoutModal = () => {
        setIsOpen(false);
        modal.logoutModal = false;
    }

    const closeViewModal = () => {
        setIsOpen(false);
        modal.viewModal = false;
        modal.task = '';
    }

    const closeEditModal = () => {
        setIsOpen(false);
        modal.editModal = false;
    }

    const closeDeleteModal = () => {
        setIsOpen(false);
        modal.deleteModal = false;
    }

    const closeClearAllModal = () => {
        setIsOpen(false);
        modal.clearAllModal = false;
    }

    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
            setTimeout(() => {
                navigate('/login');
            }, 2000)
        }).catch((error) => {
            console.log('Something went wrong ', error)
        });
    }

    const getAllTheTasks = async () => {
        const q = query(collection(db, "users"), where("email", "==", userEmail));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setUserData(doc.data().tasks);
        });
    }

    const handleEdit = async () => {
        if (editItem.length > 0) {
            handleDelete();
            await updateDoc(userDocRef, {
                tasks: arrayUnion({ id: modal.id, taskItem: editItem })
            });
            closeEditModal();
            modal.id = '';
            modal.task = '';
            setEditItem('');
            getAllTheTasks();
        } else {
            inputRef.current.focus();
        }

    }

    const handleDelete = async () => {
        await updateDoc(userDocRef, {
            tasks: arrayRemove({ id: modal.id, taskItem: modal.task })
        });
        closeDeleteModal();
        modal.id = '';
        modal.task = '';
        getAllTheTasks();
    }

    const handleClearAll = async () => {
        await updateDoc(userDocRef, {
            tasks: []
        });
        closeClearAllModal();
        getAllTheTasks();
    }

    return (
        <div className={styles.darkBG}>
            <div className={styles.centered}>
                <div className={styles.logoutModal}>

                    {modal.logoutModal && <>
                        <div className={styles.modalContent}>Are you sure you want to logout?</div>
                        <div className={styles.actionsContainer}>
                            <button className={styles.deleteBtn} onClick={handleLogout}>Logout</button>
                            <button className={styles.cancelBtn} onClick={closeLogoutModal}>Cancel</button>
                        </div></>}

                    {modal.viewModal && <>
                        <div className={styles.modalContent}>{modal.task}</div>
                        <div className={styles.actionsContainer}>
                            <button className={styles.cancelBtn} onClick={closeViewModal}>Cancel</button>
                        </div></>}

                    {modal.editModal && <>
                        <input ref={inputRef} className={styles.editInputModal} type="text" spellCheck="false"
                            value={editItem} onChange={(e) => setEditItem(e.target.value)} />
                        <div className={styles.actionsContainer}>
                            <button className={styles.deleteBtn} onClick={handleEdit}>Save</button>
                            <button className={styles.cancelBtn} onClick={closeEditModal}>Cancel</button>
                        </div></>}

                    {modal.deleteModal && <>
                        <div className={styles.modalContent}>Are you sure you want to delete the item?</div>
                        <div className={styles.actionsContainer}>
                            <button className={styles.deleteBtn} onClick={handleDelete}>Delete</button>
                            <button className={styles.cancelBtn} onClick={closeDeleteModal}>Cancel</button>
                        </div></>}

                    {modal.clearAllModal && <>
                        <div className={styles.modalContent}>Are you sure you want to delete all the items?</div>
                        <div className={styles.actionsContainer}>
                            <button className={styles.deleteBtn} onClick={handleClearAll}>Delete</button>
                            <button className={styles.cancelBtn} onClick={closeClearAllModal}>Cancel</button>
                        </div></>}

                </div>
            </div>
        </div>
    );
};

export default Modal;