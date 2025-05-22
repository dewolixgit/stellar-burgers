import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';
import { useSelector } from '@store';
import { selectIngredientById } from '@slices';
import { useParams } from 'react-router-dom';

type Props = {
  className?: string;
};

export const IngredientDetails = ({ className }: Props) => {
  const { id } = useParams<{ id: string }>();
  const ingredientData = useSelector(selectIngredientById(id!));

  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <IngredientDetailsUI
      ingredientData={ingredientData}
      className={className}
    />
  );
};
