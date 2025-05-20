import { IngredientDetails } from '@components';
import { useDispatch } from '@store';
import { useEffect } from 'react';
import { fetchIngredients } from '@slices';
import { IngredientPageUI } from '@ui';

export const Ingredient = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  return <IngredientPageUI />;
};
