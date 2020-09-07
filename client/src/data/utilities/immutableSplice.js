const immutableSplice = (array, start, remove, add) => {
  const startChunk = array.slice(0, start);
  const endChunk = array.slice(start + remove);

  return [
    ...startChunk,
    ...add,
    ...endChunk,
  ];
};

export default immutableSplice;
