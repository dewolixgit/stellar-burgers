import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '@store';
import { logoutUser } from '@slices';
import { LOCAL_STORAGE_KEYS } from '@config';
import { deleteCookie } from '../../utils/cookie';
import { COOKIES_KEYS } from '@config';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const result = await dispatch(logoutUser()).unwrap();

    if (result.success) {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.refreshToken);
      deleteCookie(COOKIES_KEYS.accessToken);
    }
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
