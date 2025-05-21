import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '@store';
import { getBun, getIngredients, getIsAuthenticated } from '@slices';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const ingredients = useSelector(getIngredients);
  const bun = useSelector(getBun);
  const navigate = useNavigate();
  const isAuthenticated = useSelector(getIsAuthenticated);

  const orderRequest = false;

  const orderModalData = null;

  const onOrderClick = () => {
    if (!bun || orderRequest) return;

    if (!isAuthenticated) {
      navigate('/login');
    }
  };
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) + +ingredients.reduce((s, v) => s + v.price, 0),
    [bun, ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{
        bun,
        ingredients
      }}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
