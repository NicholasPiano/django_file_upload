import useQuery from '../useQuery';

const useFiles = reset => {
  const resource = 'files';

  const { data, ...rest } = useQuery({ resource, reset });

  return {
    files: data,
    ...rest,
  };
};

export default useFiles;
