import { SET_THEME } from './index';

export const actionsetTheme =
  ({ theme }) =>
    (dispatch) => {
      dispatch({ type: SET_THEME, payload: theme });
    };
