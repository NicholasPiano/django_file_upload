import useQuery from '../useQuery';

const useDeleteFile = id => {
  const resource = 'files';
  const method = 'DELETE';

  const { exists, loading, data } = useQuery({ resource, method, id });

  return {
    exists,
    loading,
    done: !!data,
  };
};

export default useDeleteFile;
