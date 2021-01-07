import apiInstance from '../model/common/apiInstance';
import Cookies from 'js-cookie';

const ACCESS_TOKEN_KEY = process.env.REACT_APP_ACCESS_KEY as string;
export interface AuthToken {
  token: string;
}

const cookieOptions = {
  domain: process.env.REACT_APP_COOKIE_DOMAIN,
  path: '/',
};

export const setAuthToken = (token: AuthToken): boolean => {
  if (!token) {
    return false;
  }
  Cookies.set(ACCESS_TOKEN_KEY, token, cookieOptions);
  return true;
};

export const getAuthToken = () => {
  const token = Cookies.get();
  if (!token) {
    return { token: '' };
  }
  return token as any;
};

export const authLogout = async () => {
  try {
    const url = `/auth/logout?token=${Cookies.get(ACCESS_TOKEN_KEY)}`;
    const logoutResponse = await apiInstance.get(url);
    Cookies.remove(ACCESS_TOKEN_KEY, cookieOptions);
    window.location.href = '/';
    return logoutResponse;
  } catch (e) {
    return { ...e.response };
  }
};
