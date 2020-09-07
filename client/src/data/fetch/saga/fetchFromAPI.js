import convertUrlParameters from './convertUrlParameters';

const url = 'http://localhost:8000/api/';

function fetchFromAPI({ resource, resourceId, method, body, parameters, token }) {
  const getURL = () => {
    const resourceURL = `${url}${resource}/`;

    if (resourceId) {
      return `${resourceURL}${resourceId}/`;
    }

    return resourceURL;
  };
  const getFullURL = () => {
    const baseURL = getURL();

    if (parameters) {
      return `${baseURL}${convertUrlParameters(parameters)}`;
    }

    return baseURL;
  };
  const getBody = () => {
    if (!body) {
      return undefined;
    }

    return JSON.stringify(body);
  };
  const getContentType = () => {
    if (!body) {
      return {};
    }

    return { 'Content-Type': 'application/json' };
  }
  const getAuthorization = () => {
    if (!token) {
      return {};
    }

    return { 'Authorization': `Token ${token}` };
  };
  const getHeaders = () => ({
    ...getContentType(),
    ...getAuthorization(),
  });

  return fetch(getFullURL(), { headers: getHeaders(), method, body: getBody() })
    .then(response => response.json());
}

export default fetchFromAPI;
