import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '@store';
import { getAuthError, loginUser } from '@slices';
import { useLocation, useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const error = useSelector(getAuthError);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();

      if (result.success) {
        if (location.state?.from && location.state.from !== location.pathname) {
          navigate(location.state.from ?? '/');
        } else {
          navigate('/');
        }
      }
    } catch {}
  };

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
