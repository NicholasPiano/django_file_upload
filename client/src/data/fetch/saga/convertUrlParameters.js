const convertUrlParameters = parameters => (
  Object.keys(parameters).reduce(
    (acc, key) => {
      const parameter = parameters[key];

      if (!parameter) {
        return acc;
      }

      const separator = acc ? '&' : '?';
      const existing = acc || '';

      return `${existing}${separator}${key}=${parameter}`;
    },
    '',
  )
);

export default convertUrlParameters;
