import useQuery from '../useQuery';

const useDeleteLink = ({ fileId, id }) => {
  const resource = `files/${fileId}/links`;
  const method = 'DELETE';

  const { exists, loading } = useQuery({ resource, method, id });

  return {
    exists,
    loading,
  };
};

export default useDeleteLink;
