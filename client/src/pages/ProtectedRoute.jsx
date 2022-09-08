import React from 'react'
import { useGlobally } from '../context/context'
import { Navigate, Outlet } from 'react-router-dom'
import ErrorDisplay from "../components/ErrorDisplay";

const ProtectedRoute = ({children}) => {
    const { username } = useGlobally()
     if (!username) {
       return <Navigate to="/auth" />;
     } 
  return ( 
    <>
      <ErrorDisplay />
      <Outlet />
    </>
  );
}

export default ProtectedRoute;
