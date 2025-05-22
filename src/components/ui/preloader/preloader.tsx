import React from 'react';
import styles from './preloader.module.css';
import clsx from 'clsx';

type Props = {
  className?: string;
};

export const Preloader = ({ className }: Props) => (
  <div className={clsx(styles.preloader, className)}>
    <div className={styles.preloader_circle} />
  </div>
);
