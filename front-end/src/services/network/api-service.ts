import axios, { AxiosRequestConfig } from "axios";
import { getCookie } from "@utils/handle-tokens";
import { cookiesKeys } from "constants/cookies-keys";

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
  queryParams?: any; // Can it be: AxiosRequestConfig;
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
    throw error;
  }
};

interface IPostApi {
  url: string;
  data: any;
  queryParams: any; // Can it be: AxiosRequestConfig;
}

export const post = async ({ url, data, queryParams = {} }: IPostApi) => {
  try {
    const response = await client.post(url, {
      params: queryParams,
    });

    if (isRequestSuccess(response.status)) {
      return response.data;
    } else {
      throw Error(response.statusText);
    }
  } catch (error) {
    throw error;
  }
};

function isRequestSuccess(statusCode: number): boolean {
  return statusCode == 200 || statusCode == 201;
}
