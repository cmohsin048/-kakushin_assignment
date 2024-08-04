import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Task from '../components/Task';
import ModalComponent from '../components/ModalComponent';
import axios from 'axios';

const CompleteTask = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3200/tasks');
      setTasks(response.data.filter(task => task.completed));
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const openModal = (task) => {
    setTaskToEdit(task);
  };

  const closeModal = () => {
    setTaskToEdit(null);
  };

  const handleTaskUpdated = () => {
    fetchTasks();
    closeModal();
  };

  return (
    <div className='main-task'>
      <div id="hamburger">
        <FontAwesomeIcon icon={faBars} onClick={toggleSidebar} />
      </div>
      <Sidebar isOpen={isSidebarOpen} closeNavMenu={closeNavMenu} />
      <div className='display-task'>
        <h2>Completed Task</h2>
        <div className='add-task'>
          <ModalComponent
            taskToEdit={taskToEdit}
            onClose={closeModal}
            onTaskUpdated={handleTaskUpdated}
          /></div>
        <div className='all-tasks'>
          {tasks.map(task => (
            <Task key={task._id} task={task} updateTaskLists={fetchTasks} openModal={openModal} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default CompleteTask;
