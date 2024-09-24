import { routes } from '@routing/routes';
import { getCookie } from '@utils/handle-tokens';
import axios, { AxiosError } from 'axios';
import { cookiesKeys } from 'constants/cookies-keys';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const client = axios.create({
  baseURL: apiBaseUrl,
  timeout: 5000,
});

export const setupInterceptors = () => {
  // Request interceptor
  client.interceptors.request.use(
    function (config) {
      const token = getCookie(cookiesKeys.accessToken);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
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
      if (error['status'] === 401) {
        window.location.href = routes.signin;
      }
      return Promise.reject(error);
    }
  );
};

setupInterceptors();

const handleError = (error: Error, callback?: (data: string) => void) => {
  if (callback) {
    if (error instanceof AxiosError) {
      const data = error.response?.data?.message || 'Something went wrong!';
      callback(data);
    } else {
      callback(error['message']);
    }
  }
};

interface IApi {
  url: string;
  queryParams?: object;
  abortController?: AbortController;
  payload?: object;
  callback?: (data: string) => void;
}

export const get = async ({
  url,
  queryParams = {},
  abortController = null,
  callback,
}: IApi) => {
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
    handleError(error, callback);
    console.error(error);
  }
};

export const post = async ({ url, payload, callback }: IApi) => {
  try {
    const response = await client.post(url, payload);

    if (isRequestSuccess(response.status)) {
      return response.data;
    } else {
      throw Error(response.statusText);
    }
  } catch (error) {
    handleError(error, callback);
  }
};

export const patch = async ({
  url,
  queryParams = {},
  abortController = null,
  callback,
}: IApi) => {
  try {
    console.log(queryParams, '-----------query');
    const response = await client.patch(url, queryParams, {
      params: queryParams,
      signal: abortController?.signal,
    });

    console.log(response, '-------api');

    if (isRequestSuccess(response.status)) {
      return response.data;
    } else {
      throw Error(response.statusText);
    }
  } catch (error) {
    handleError(error, callback);
  }
};

function isRequestSuccess(statusCode: number): boolean {
  return statusCode == 200 || statusCode == 201;
}
