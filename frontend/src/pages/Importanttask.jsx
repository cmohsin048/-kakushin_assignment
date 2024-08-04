import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Task from '../components/Task';
import ModalComponent from '../components/ModalComponent';
import axios from 'axios';

const ImportantTask = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://kakushin-assignment.vercel.app/tasks');
      setTasks(response.data.filter(task => task.favorite));
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
        <h2>Important Task</h2>
        <div className='add-task'>
          <ModalComponent
            taskToEdit={taskToEdit}
            onClose={closeModal}
            onTaskUpdated={handleTaskUpdated}
          />
        </div>
        <div className='all-tasks'>
          {tasks.map(task => (
            <Task key={task._id} task={task} updateTaskLists={fetchTasks} openModal={openModal} />
          ))}
        </div>
        {/* <ModalComponent
          taskToEdit={taskToEdit}
          onClose={closeModal}
          onTaskUpdated={handleTaskUpdated}
        /> */}
      </div>
    </div>
  );
};

export default ImportantTask;
