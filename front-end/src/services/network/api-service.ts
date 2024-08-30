import axios, { AxiosRequestConfig } from "axios";

const client = axios.create({
  baseURL: "http://localhost:8080",
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
  queryParams?: AxiosRequestConfig; // Can it be: AxiosRequestConfig;
}

export const get = async ({ url, queryParams = {} }: IGetApi) => {
  try {
    const response = await client.get(url, {
      params: queryParams,
    });

    if (isRequestSuccess(response.status)) {
      return response.data;
    } else {
      throw Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
  }
};

export interface DefaultResponse<T> {
  data?: T;
}

interface IPostApi extends IGetApi {
  payload?: string;
  callbackfun: (data) => void;
}

export const post = async ({ url, payload, queryParams = {} }: IPostApi) => {
  try {
    const response = await client.post(url, { payload, params: queryParams });

    if (isRequestSuccess(response.status)) {
      return response.data;
    } else {
      throw Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
  }
};

function isRequestSuccess(statusCode: number): boolean {
  return statusCode == 200 || statusCode == 201;
}
