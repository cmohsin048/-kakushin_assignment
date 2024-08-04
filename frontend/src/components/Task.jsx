import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faTrashArrowUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Task = ({ task, updateTaskLists, openModal }) => {
  const [complete, setComplete] = useState(task.completed);
  const [imp, setImp] = useState(task.favorite);

  useEffect(() => {
    setComplete(task.completed);
    setImp(task.favorite);
  }, [task]);

  const handleTask = async () => {
    try {
      await axios.patch(`https://kakushin-assignment.vercel.app/tasks/${task._id}`, {
        completed: !complete,
      });
      setComplete(prev => !prev);
      updateTaskLists();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleFav = async () => {
    try {
      await axios.patch(`https://kakushin-assignment.vercel.app/tasks/${task._id}`, {
        favorite: !imp,
      });
      setImp(prev => !prev);
      updateTaskLists();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleEdit = () => {
    openModal(task);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://kakushin-assignment.vercel.app/tasks/${task._id}`);
      updateTaskLists();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className='task'>
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>
      <div className='Date'>
        <p>Deadline: {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'N/A'}</p>
      </div>
      <div className='actions'>
        <button onClick={handleTask}>
          {complete ? 'Completed' : 'Incomplete'}
        </button>
        <FontAwesomeIcon
          icon={imp ? faStarSolid : faStarRegular}
          onClick={handleFav}
        />
        <FontAwesomeIcon
          icon={faEdit}
          style={{ color: "#e8eaed" }}
          onClick={handleEdit}
        />
        <FontAwesomeIcon
          icon={faTrashArrowUp}
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default Task;
