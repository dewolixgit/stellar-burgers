import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';

type Props = {
  onlyAuth?: boolean;
  onlyUnauth?: boolean;
  children: ReactNode;
};

export const ProtectedRoute = ({ children, onlyAuth, onlyUnauth }: Props) => {
  const location = useLocation();

  // Todo: Определять, авторизован ли пользователь
  const isAuth = true;

  // Если требуется авторизация, а пользователь не авторизован, то редиректим на страницу логина
  if (!onlyAuth && !isAuth) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  // Если требуется неавторизованный доступ, а пользователь авторизован, то редиректим на главную страницу
  if (onlyUnauth && isAuth) {
    return <Navigate to='/' replace />;
  }

  return <>{children}</>;
};
