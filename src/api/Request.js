import axios from "axios";
import { store } from "../index";

const debugData = res => {
  return Promise.resolve(res.data);
};

const debugError = er => {
  return Promise.reject(er.response.data);
};

const request = (options = {}) => {
  const token = store.getState().auth.token;
  const headers = {};
  const formDataHeaders = {};

  if (token) {
    headers.Authorization = `Token ${token}`;
    formDataHeaders.Authorization = `Token ${token}`;
  }

  const axiosApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: headers,
    ...options
  });

  const axiosApiWithFromData = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: formDataHeaders,
    ...options
  });

  return {
    get(url, data) {
      return axiosApi.get(url, data).then(debugData).catch(debugError);
    },
    post(url, data) {
      return axiosApi.post(url, data).then(debugData).catch(debugError);
    },
    put(url, data) {
      return axiosApi.put(url, data).then(debugData).catch(debugError);
    },
    delete(url) {
      return axiosApi.delete(url).then(debugData).catch(debugError);
    },
    custom(config) {
      return axios(config).then(debugData).catch(debugError);
    },
    postFormData(url, data) {
      return axiosApiWithFromData.post(url, data).then(debugData).catch(debugError);
    },
    putFormData(url, data) {
      return axiosApiWithFromData.put(url, data).then(debugData).catch(debugError);
    }
  };
};

export default request;