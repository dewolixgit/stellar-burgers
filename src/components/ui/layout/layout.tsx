import { AppHeader } from '@components';
import { ReactNode } from 'react';

import s from './layout.module.css';

type Props = {
  children?: ReactNode;
  inFlexContainer?: boolean;
};

export const Layout = ({ children, inFlexContainer }: Props) => {
  if (inFlexContainer) {
    return (
      <div className={s['flex-container']}>
        <AppHeader />
        {children}
      </div>
    );
  }

  return (
    <>
      <AppHeader />
      {children}
    </>
  );
};
