import { KEY_ENTER } from '../constants/keyPressCodes';

const onKeyDownEnter = (e) => {
  const key = e.which || e.keyCode || 0;
  if (key === KEY_ENTER) {
    e.target.click();
  }
};

export default onKeyDownEnter;
