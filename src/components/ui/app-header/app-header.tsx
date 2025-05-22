import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({
  userName,
  profilePath,
  ordersPath,
  constructorPath,
  currentPath
}) => {
  const constructorPathIsActive = constructorPath === currentPath;
  const ordersPathIsActive = ordersPath === currentPath;
  const profilePathIsActive = profilePath === currentPath;

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <Link
            className={clsx(
              styles.link,
              constructorPathIsActive && styles.link_active
            )}
            to={constructorPath ?? ''}
          >
            <BurgerIcon type={'primary'} />
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </Link>
          <Link
            className={clsx(
              styles.link,
              ordersPathIsActive && styles.link_active
            )}
            to={ordersPath ?? ''}
          >
            <ListIcon type={'primary'} />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </Link>
        </div>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
        <Link
          to={profilePath ?? ''}
          className={clsx(
            styles.link,
            styles.link_position_last,
            profilePathIsActive && styles.link_active
          )}
        >
          <ProfileIcon type={'primary'} />
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </Link>
      </nav>
    </header>
  );
};
