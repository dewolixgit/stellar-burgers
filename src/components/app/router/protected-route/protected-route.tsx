import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { useSelector } from '@store';
import { getIsAuthenticated } from '@slices';

type Props = {
  onlyAuth?: boolean;
  onlyUnauth?: boolean;
  children: ReactNode;
};

export const ProtectedRoute = ({ children, onlyAuth, onlyUnauth }: Props) => {
  const location = useLocation();
  const isAuthenticated = useSelector(getIsAuthenticated);

  // Если требуется авторизация, а пользователь не авторизован, то редиректим на страницу логина
  if (onlyAuth && !isAuthenticated) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  // Если требуется неавторизованный доступ, а пользователь авторизован, то редиректим на главную страницу
  if (onlyUnauth && isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  return <>{children}</>;
};
