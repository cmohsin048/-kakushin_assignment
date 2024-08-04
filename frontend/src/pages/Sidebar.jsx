import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedOut } from '../Reducer/Authslice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
const Sidebar = ({ isOpen, closeNavMenu }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const logout = () => {
    dispatch(setLoggedOut())
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  }
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className='close-icon'>
        <FontAwesomeIcon className='crossham' icon={faXmark} onClick={closeNavMenu} style={{ color: '#EEEEEE' }} />
      </div>
      <div className='tasks'>
        <span><Link className='i' to='/AllTask'>All tasks</Link></span>
        <span><Link className='i' to='/Completetask'>Completed tasks</Link></span>
        <span><Link className='i' to='/Incompletetask'>Incomplete tasks</Link></span>
        <span><Link className='i' to='/Importanttask'>Important tasks</Link></span>
      </div>
      <div className='logout'>
        <button className='logout-button' onClick={logout}>Logout</button>
      </div>
    </div>
  )
}

export default Sidebar