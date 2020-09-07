import useQuery from '../useQuery';

const useFile = id => {
  const resource = 'files';

  const { data, ...rest } = useQuery({ resource, id });

  return {
    file: data,
    ...rest,
  };
};

export default useFile;
