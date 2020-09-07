import useQuery from '../useQuery';

const useCreateLink = ({ fileId, ...body }) => {
  const resource = `files/${fileId}/links`;
  const method = 'POST';

  const { exists, loading, data } = useQuery({ resource, method, body });

  return {
    exists,
    loading,
    link: data,
  };
};

export default useCreateLink;
