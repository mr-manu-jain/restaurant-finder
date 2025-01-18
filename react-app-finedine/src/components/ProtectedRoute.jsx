import { Navigate, Outlet } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';

const ProtectedRoute = () => {
  const { instance } = useMsal();
  const account = instance.getActiveAccount();

  if (!account) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;