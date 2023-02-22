import React from 'react'
import todoStyles from './Todos.module.css';
import editIcon from './images/pencil.png';
import deleteIcon from './images/delete.png';

const Todos = ({ userData, viewTask, editTask, deleteTask }) => {

  const viewTaskModal = (e) => {
    viewTask(e.target.innerHTML);
  }

  const editTaskModal = (e) => {
    editTask(e.target.dataset.id, e.target.dataset.task);
  }

  const deleteTaskModal = (e) => {
    deleteTask(e.target.dataset.id, e.target.dataset.task);
  }

  return (
    <>
      {
        userData && userData.map((data) => {
          return <div key={data.id} className={todoStyles.todoItem}>
            <div onClick={viewTaskModal} className={todoStyles.todoText}>{data.taskItem}</div>
            <div className={todoStyles.actionContainer}>
              <img data-id={data.id} data-task={data.taskItem} onClick={editTaskModal} alt='edit-icon' src={editIcon} className={`${todoStyles.action} ${todoStyles.editBtn}`} />
              <img data-id={data.id} data-task={data.taskItem} onClick={deleteTaskModal} alt='delete-icon' src={deleteIcon} className={todoStyles.action} />
            </div>
          </div>
        }
        )
      }
    </>)
}

export default Todos