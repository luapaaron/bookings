import moment from 'moment';
import isEmpty from './isEmpty';

const dateFormat = (date, dateformat = 'DD/MM/YYYY', isUnix = true) => {
  let dateReturn = '';
  if (!isEmpty(date)) {
    if (isUnix) {
      dateReturn = `${moment.unix(date).format(dateformat)}`;
    } else {
      dateReturn = `${moment(date).format(dateformat)}`;
    }
  }
  return dateReturn;
};

export default dateFormat;
