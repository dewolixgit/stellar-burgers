import { FC, useEffect } from 'react';
import { ConstructorPageUI } from '@ui-pages';
import { useDispatch, useSelector } from '@store';
import { fetchIngredients, getIsIngredientsLoading } from '@slices';

export const ConstructorPage: FC = () => {
  const isIngredientsLoading = useSelector(getIsIngredientsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  return <ConstructorPageUI isIngredientsLoading={isIngredientsLoading} />;
};
