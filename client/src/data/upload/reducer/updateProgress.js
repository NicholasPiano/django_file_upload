const updateProgress = (state, action) => ({
  ...state,
  [action.payload.id]: action.payload.progress,
});

export default updateProgress;
