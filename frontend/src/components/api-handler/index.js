import axios from 'axios';

const host = process.env.REACT_APP_API_HOST;

function createUrl(resource) {
  return `${host}/${resource}`;
}

export const getResource = async resource => {
  const url = createUrl(resource);

  return await axios.get(url);
};

export const getResourceWithParams = async (resource, params) => {
  const url = createUrl(resource);

  return await axios.get(url, params);
};

export const createResource = async (resource, data) => {
  const url = createUrl(resource);

  return await axios.get(url, data);
};

export const deleteResource = async resource => {
  const url = createUrl(resource);

  return await axios.delete(url);
};
