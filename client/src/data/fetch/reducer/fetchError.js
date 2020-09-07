const fetchError = (state, action) => {
  const { id, error } = action.payload;
  const { [id]: query } = state;

  return {
    ...state,
    [id]: {
      ...query,
      error,
      loading: false,
    },
  };
};

export default fetchError;
