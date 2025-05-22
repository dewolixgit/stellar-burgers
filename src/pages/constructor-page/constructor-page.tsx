import { FC } from 'react';
import { ConstructorPageUI } from '@ui-pages';
import { useSelector } from '@store';
import { getIsIngredientsLoading } from '@slices';

export const ConstructorPage: FC = () => {
  const isIngredientsLoading = useSelector(getIsIngredientsLoading);

  return <ConstructorPageUI isIngredientsLoading={isIngredientsLoading} />;
};
