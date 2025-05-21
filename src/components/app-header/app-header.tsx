import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '@store';
import { getUser } from '@slices';
import { matchPath, useLocation } from 'react-router-dom';

const CONSTRUCTOR_PATH = '/';
const ORDERS_PATH = '/feed';
const PROFILE_PATH = '/profile';

export const AppHeader: FC = () => {
  const user = useSelector(getUser);
  const location = useLocation();

  const matchedConstructorPath = matchPath({ path: '/' }, location.pathname)
    ? CONSTRUCTOR_PATH
    : null;

  const matchedOrdersPath = matchPath({ path: '/feed/*' }, location.pathname)
    ? ORDERS_PATH
    : null;

  const matchedProfilePath = matchPath(
    { path: '/profile/*' },
    location.pathname
  )
    ? PROFILE_PATH
    : null;

  console.log('matchedConstructorPath', matchedConstructorPath);
  console.log('matchedOrdersPath', matchedOrdersPath);
  console.log('matchedProfilePath', matchedProfilePath);

  return (
    <AppHeaderUI
      userName={user?.name}
      constructorPath={CONSTRUCTOR_PATH}
      ordersPath={ORDERS_PATH}
      profilePath={PROFILE_PATH}
      currentPath={
        matchedConstructorPath ?? matchedOrdersPath ?? matchedProfilePath
      }
    />
  );
};
