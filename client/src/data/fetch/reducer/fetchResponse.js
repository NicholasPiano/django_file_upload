const fetchResponse = (state, action) => {
  const { id, response } = action.payload;
  const { [id]: query } = state;

  return {
    ...state,
    [id]: {
      ...query,
      error: null,
      loading: false,
      data: response,
    },
  };
};

export default fetchResponse;
