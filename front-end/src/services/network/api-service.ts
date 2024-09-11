import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const client = axios.create({
  baseURL: apiBaseUrl,
  timeout: 5000,
});

// Request interceptor
client.interceptors.request.use(
  function (config) {
    // const token = getCookie(cookiesKeys.accessToken);
    // if (token) {
    //   config.headers.Authorization = token;
    // }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptor
client.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

interface IGetApi {
  url: string;
  queryParams?: object;
  abortController?: AbortController;
  callback?: (data) => void;
}

export const get = async ({
  url,
  queryParams = {},
  abortController = null,
  callback,
}: IGetApi) => {
  try {
    const response = await client.get(url, {
      signal: abortController?.signal,
      params: queryParams,
    });

    console.log(response, '-------api');

    if (isRequestSuccess(response.status)) {
      return response.data;
    } else {
      throw Error(response.statusText);
    }
  } catch (error) {
    if (callback) {
      callback(error['message']);
    }
    console.error(error);
  }
};

interface IPostApi extends IGetApi {
  payload?: object;
  callback?: (data) => void;
}

export const post = async ({ url, payload, callback }: IPostApi) => {
  try {
    const response = await client.post(url, payload);

    if (isRequestSuccess(response.status)) {
      return response.data;
    } else {
      throw Error(response.statusText);
    }
  } catch (error) {
    if (callback) {
      callback(error['message']);
    }
    console.error(error);
  }
};

function isRequestSuccess(statusCode: number): boolean {
  return statusCode == 200 || statusCode == 201;
}
