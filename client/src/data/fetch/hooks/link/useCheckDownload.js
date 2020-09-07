import useQuery from '../useQuery';

const useCheckDownload = token => {
  const resource = `files/check_download/${token}`;
  const method = 'GET';

  const { exists, loading, data, error } = useQuery({ resource, method });

  return {
    exists,
    loading,
    data,
    error,
  };
};

export default useCheckDownload;
