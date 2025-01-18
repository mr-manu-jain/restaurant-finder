import { Navigate, Outlet } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';

const BusinessProtectedRoute = () => {
  const { instance } = useMsal();
  const account = instance.getActiveAccount();
  const userData = JSON.parse(sessionStorage.getItem('userData'));

  if (!account || userData?.role !== 'Owner') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default BusinessProtectedRoute;