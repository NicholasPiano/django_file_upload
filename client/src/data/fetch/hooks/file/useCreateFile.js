import { hooks } from '../../../upload';
import useQuery from '../useQuery';

const useCreateFile = file => {
  const resource = 'files';
  const method = 'POST';
  const body = { name: file.path };

  const { exists, loading, data } = useQuery({
    resource,
    method,
    body,
  });

  const blocked = !data;
  const { id } = data || {};
  const { progress } = hooks.useUpload({ id, file, blocked });

  return {
    exists,
    loading,
    progress,
    file: data,
  };
};

export default useCreateFile;
