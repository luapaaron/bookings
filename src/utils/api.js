import { request } from 'axios';

import config from '@constants/serverConfig';

const api = (options = {}) => {
  const finalOptions = {
    baseURL: config.SERVER_BASE_URL,
    ...options,
    headers: {
      ...options.headers,
    },
  };

  return request({ ...finalOptions });
};

export default api;
