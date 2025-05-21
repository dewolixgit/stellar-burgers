import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '@store';
import {
  fetchFeeds,
  fetchUserOrders,
  getFeedsItems,
  getUserOrders
} from '@slices';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(getFeedsItems);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeeds());
  }, []);

  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
