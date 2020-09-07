import useQuery from '../useQuery';

const useDeleteLink = ({ token }) => {
  const resource = `files/download/${token}`;
  const method = 'POST';

  const { exists, loading } = useQuery({ resource, method });

  return {
    exists,
    loading,
  };
};

export default useDeleteLink;
