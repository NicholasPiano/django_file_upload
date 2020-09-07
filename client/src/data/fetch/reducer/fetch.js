const fetch = (state, action) => {
  const { id, ...rest } = action.payload;
  const { [id]: existing } = state;

  return {
    ...state,
    [id]: {
      ...existing,
      parameters: { ...rest },
      loading: true,
      exists: true,
    },
  };
};

export default fetch;
