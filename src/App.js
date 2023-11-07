import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import PageList from './pages/PageList';
import PageDetail from './pages/PageDetail';
import PrivateRoute from './auth/PrivateRoute';
import Login from './auth/Login';
import Signup from './auth/Signup';

import './App.css';

const App = () => {
  const isAuthenticated = localStorage.getItem('accessToken') === null ? false : true; 
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.href="/login";
  }

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            {
              !isAuthenticated ? (
                <>
                  <li>
                    <Link to="/login">Log In</Link>
                  </li>
                  <li>
                    <Link to="/signup">Sign Up</Link>
                  </li>
                </>
              ) : (
                <>
                  <li onClick={() => handleLogout()}>
                    <a href="/login">
                      Log Out
                    </a>
                  </li>
                </>
              )
            }
            
          </ul>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<PrivateRoute Component={PageList} />} />
          <Route path="/page/:id" element={<PageDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;