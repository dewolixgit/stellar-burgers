import { IngredientDetails } from '@components';

import s from './ingredient-page.module.css';
import { Layout } from '@ui';

export const IngredientPageUI = () => (
  <Layout inFlexContainer>
    <IngredientDetails className={s.details} />
  </Layout>
);
