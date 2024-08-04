import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AllTask from './pages/AllTask';
import Completetask from './pages/Completetask';
import Importanttask from './pages/Importanttask';
import Incompletetask from './pages/Incompletetask';
import Login from './pages/Login';
import Register from './pages/Register';
import { setLoggedIn, setLoggedOut } from './Reducer/Authslice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (loggedIn) {
      dispatch(setLoggedIn());
    } else {
      dispatch(setLoggedOut());
    }
  }, [dispatch]);

  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' element={isLoggedIn ? <Navigate to='/AllTask' /> : <Login />} />
          <Route path='/AllTask' element={isLoggedIn ? <AllTask /> : <Navigate to='/Login' />} />
          <Route path='/Importanttask' element={isLoggedIn ? <Importanttask /> : <Navigate to='/Login' />} />
          <Route path='/Completetask' element={isLoggedIn ? <Completetask /> : <Navigate to='/Login' />} />
          <Route path='/Incompletetask' element={isLoggedIn ? <Incompletetask /> : <Navigate to='/Login' />} />
          <Route path='/Login' element={isLoggedIn ? <Navigate to='/AllTask' /> : <Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
