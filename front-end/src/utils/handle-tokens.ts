import { cookiesKeys } from 'constants/cookies-keys';

export const isUserLoggedIn = () => {
  const accessToken = getCookie('accessToken');
  return accessToken ? true : false;
};

export function getCookie(name: string): string {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts?.pop()?.split(';').shift();
}

export const setAccessTokenInCookie = (token: string) => {
  // All cookies expire as per the cookie specification. Maximum value you can set is:
  //  2^31 - 1 = 2147483647 = 2038-01-19 04:14:07
  // It's equal to the below number.

  document.cookie = `${
    cookiesKeys.accessToken
  }=${token};expires=${2147483647};path=/`;
};

export const deleteCookie = (name: string) => {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

interface ICookieParams {
  key: string;
  value: string;
  expires?: string;
  path?: string;
}
export const setCookie = ({
  key,
  value,
  expires = null,
  path = '/',
}: ICookieParams) => {
  document.cookie = `${key}=${value};expires=${expires};path=${path}`;
};
