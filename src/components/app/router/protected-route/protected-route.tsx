import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { useSelector } from '@store';
import { getUser } from '@slices';

type Props = {
  onlyAuth?: boolean;
  onlyUnauth?: boolean;
  children: ReactNode;
};

export const ProtectedRoute = ({ children, onlyAuth, onlyUnauth }: Props) => {
  const location = useLocation();
  const user = useSelector(getUser);

  // Если требуется авторизация, а пользователь не авторизован, то редиректим на страницу логина
  if (onlyAuth && !user) {
    console.log('redirect to login');
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  // Если требуется неавторизованный доступ, а пользователь авторизован, то редиректим на главную страницу
  if (onlyUnauth && user) {
    console.log('redirect to /');
    return <Navigate to='/' replace />;
  }

  return <>{children}</>;
};
