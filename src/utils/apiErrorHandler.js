const apiErrorHandler = (store) => (next) => (action) => {
  next(action);
};

export default apiErrorHandler;
