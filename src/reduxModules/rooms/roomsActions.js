import { SUCCESS, PENDING, ERROR } from '@constants/actionStatus';

import api from '@utils/api';

import { FETCH_ROOMS } from './index';

export const actionFetchRooms = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ROOMS + PENDING });

    const { data } = await api({
      url: '/rooms',
    });

    dispatch({ type: FETCH_ROOMS + SUCCESS, payload: { data } });
  } catch (e) {
    dispatch({ type: FETCH_ROOMS + ERROR, payload: 'Something went wrong' });
  }
};
