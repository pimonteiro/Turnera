import axios from 'axios';

const host = process.env.REACT_APP_API_HOST;

export function createUrl(resource) {
  if (resource.startsWith('sign')) {
    return `${host}/${resource}`;
  }

  return `${host}/${resource}?token=${localStorage.getItem('token')}`;
}

export const uploadFile = async (resource, file) => {
  const url = createUrl(resource);

  var formdata = new FormData()
  formdata.append('file',file)

  return await axios({
    url: url,
    method: "POST",
    data: formdata
  })
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

  return await axios.post(url, data);
};

export const deleteResource = async resource => {
  const url = createUrl(resource);

  return await axios.delete(url);
};

export const updateResource = async (resource, data) => {
  const url = createUrl(resource);

  return await axios.put(url, data);
};
