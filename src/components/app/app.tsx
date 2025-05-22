import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import React, { useEffect } from 'react';
import { ProtectedRoute } from './router/protected-route';
import { IngredientDetails, Modal, OrderInfo } from '@components';
import { Ingredient } from '../../pages/ingredient';
import { fetchIngredients, fetchUser } from '@slices';
import { useDispatch, useSelector } from '@store';
import { Layout, Preloader } from '@ui';

function App() {
  const [authChecked, setAuthChecked] = React.useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { background?: Location };

  const dispatch = useDispatch();

  useEffect(() => {
    const load = async () => {
      await Promise.all([dispatch(fetchUser()), dispatch(fetchIngredients())]);
      setAuthChecked(true);
    };

    load();
  }, []);

  const onModalClose = (pathToPush: string) => () => {
    if (state.background) {
      // Рассматриваем наличие state.background как показатель наличия предыдущего шага истории
      navigate(-1);
    } else {
      navigate(pathToPush);
    }
  };

  if (!authChecked) {
    return (
      <Layout inFlexContainer>
        <Preloader />
      </Layout>
    );
  }

  return (
    <Layout inFlexContainer>
      <Routes location={state?.background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/ingredients/:id' element={<Ingredient />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnauth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnauth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnauth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnauth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute onlyAuth>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute onlyAuth>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Модалки поверх текущей страницы */}
      {state?.background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={onModalClose('/')}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal title='Детали заказа' onClose={onModalClose('/feed')}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute onlyAuth>
                <Modal
                  title='Детали заказа'
                  onClose={onModalClose('/profile/orders')}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </Layout>
  );
}

export default App;
