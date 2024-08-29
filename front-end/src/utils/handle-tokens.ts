import { cookiesKeys } from "constants/cookies-keys";

export const isUserLoggedIn = () => {
  const accessToken = getCookie("accessToken");
  return accessToken ? true : false;
};

export function getCookie(name: string): string {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts?.pop()?.split(";").shift();
}

export const setAccessTokenInCookie = (token: string) => {
  var now = new Date();
  var time = now.getTime();
  var expireTime = time + 1000 * 36000;
  now.setTime(expireTime);
  document.cookie = `${
    cookiesKeys.accessToken
  }=${token};expires=${now.toUTCString()};path=/`;
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
  path = "/",
}: ICookieParams) => {
  document.cookie = `${key}=${value};expires=${expires};path=${path}`;
};
