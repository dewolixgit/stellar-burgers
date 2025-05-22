import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '@store';
import {
  clearConstructor,
  getBun,
  getIngredients,
  getIsAuthenticated,
  getMadeOrder,
  getMakeOrderLoading,
  makeOrder,
  resetMadeOrder
} from '@slices';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();

  const ingredients = useSelector(getIngredients);
  const bun = useSelector(getBun);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const makeOrderLoading = useSelector(getMakeOrderLoading);
  const madeOrder = useSelector(getMadeOrder);

  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (!bun || makeOrderLoading || !ingredients.length) return;

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    dispatch(clearConstructor());

    const ingredientsIds = ingredients.map(({ _id }) => _id);

    dispatch(makeOrder([bun._id, ...ingredientsIds]));
  };

  const closeOrderModal = () => {
    dispatch(resetMadeOrder());
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) + +ingredients.reduce((s, v) => s + v.price, 0),
    [bun, ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={makeOrderLoading}
      constructorItems={{
        bun,
        ingredients
      }}
      orderModalData={madeOrder}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
