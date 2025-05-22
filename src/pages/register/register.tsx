import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '@store';
import { getAuthError, loginUser, registerUser } from '@slices';
import { useLocation, useNavigate } from 'react-router-dom';
import { setCookie } from '../../utils/cookie';
import { COOKIES_KEYS } from '../../utils/config/cookies';
import { LOCAL_STORAGE_KEYS } from '../../utils/config/localStorage';

export const Register: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const error = useSelector(getAuthError);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const result = await dispatch(
        registerUser({ name, email, password })
      ).unwrap();

      if (result.success) {
        setCookie(COOKIES_KEYS.accessToken, result.accessToken);
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.refreshToken,
          result.refreshToken
        );

        if (location.state?.from && location.state.from !== location.pathname) {
          navigate(location.state.from ?? '/');
        } else {
          navigate('/');
        }
      }
    } catch {}
  };

  return (
    <RegisterUI
      errorText={error}
      email={email}
      userName={name}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setName}
      handleSubmit={handleSubmit}
    />
  );
};
