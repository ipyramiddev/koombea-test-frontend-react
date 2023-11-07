import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ Component }) => {
  const isAuthenticated = localStorage.getItem('accessToken') === null ? false : true; 

  if (isAuthenticated) return <Component />;

  return <Navigate to={'/login'} replace={true} />;
};

export default PrivateRoute;