import React, { useEffect, useState } from 'react';
import ModalComponent from '../components/ModalComponent';
import Task from '../components/Task';
import Sidebar from './Sidebar';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
const AllTask = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeNavMenu = () => {
    setIsSidebarOpen(false);
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3200/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to fetch tasks. Please try again later.');
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

  const updateTaskLists = () => {
    fetchTasks();
  };

  if (error) {
    return <div className='error'>{error}</div>;
  }

  return (
    <div className='main-task'>
      <div id="hamburger">
        <FontAwesomeIcon icon={faBars} onClick={toggleSidebar} />
      </div>
      <Sidebar isOpen={isSidebarOpen} closeNavMenu={closeNavMenu} />
      <div className='display-task'>
        <h2>All Tasks</h2>
        <div className='add-task'>
          <ModalComponent
            taskToEdit={taskToEdit}
            onClose={closeModal}
            onTaskUpdated={updateTaskLists}
          />
        </div>
        <div className='all-tasks'>
          {tasks.map((task) => (
            <Task key={task._id} task={task} updateTaskLists={updateTaskLists} openModal={openModal} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTask;
