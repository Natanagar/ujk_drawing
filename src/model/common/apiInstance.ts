import axios from 'axios';
import get from 'lodash/get';
import forEach from 'lodash/forEach';
import findIndex from 'lodash/findIndex';
import { notification } from 'antd';
import { getAuthToken, setAuthToken } from '../authHelpers';
import { appHistory } from '../../App';
import parseApiError from '../common/parseApiError';
import * as paths from '../../router/paths';

const isNotExceptionPage = () => {
  const { href } = window.location;
  const urls = [paths.AUTH];

  return findIndex(urls, item => href.indexOf(item) !== -1) === -1;
};

const isTokenedRequest = (url?: string) => {
  if (!url) {
    return true;
  }
  const nonJwtUrls = ['login', 'signup', 'refresh'];
  let isJwtUrl = true;
  forEach(nonJwtUrls, (nonJwtUrl: string) => {
    if (url.indexOf(nonJwtUrl) > -1) {
      isJwtUrl = false;
    }
  });

  return isJwtUrl;
};

// race-condition
let isRefreshingToken = false;
let refreshTokenPromise: any;

const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_API,
});
const getrefreshTokenPromise = (token: string) => {
  if (isRefreshingToken) {
    return refreshTokenPromise;
  }

  isRefreshingToken = true;
  refreshTokenPromise = apiInstance
    .get(`/user/profile/?secret_token=${token}`)
    .then(() => {
      isRefreshingToken = false;
    })
    .catch(() => {
      isRefreshingToken = false;
    });
  return refreshTokenPromise;
};

apiInstance.interceptors.request.use(
  config => {
    const originalRequest = config;
    const token = getAuthToken();
    if (token && isTokenedRequest(config.url)) {
      originalRequest.headers['x-access-token'] = token;
    }

    return Promise.resolve(originalRequest);
  },
  err => Promise.reject(err)
);

apiInstance.interceptors.response.use(
  response => {
    if (response.status !== 200) {
      notification.error({
        message: 'Server error',
        description: `Status ${response.status}`,
      });
    }
    return response;
  },
  error => {
    const originalRequest = error.config;
    const shouldRetry =
      error.response.status === 403 &&
      isNotExceptionPage() &&
      error.config.url !== '/user/info';
    if (shouldRetry) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        if (getAuthToken()?.token) {
          return getrefreshTokenPromise(getAuthToken()?.token)
            .then((response: any) => {
              console.log(response);
              const token = get(response, 'data.token', null);
              setAuthToken({ token });

              originalRequest.url = originalRequest.url.replace('/', '');
              return apiInstance(originalRequest);
            })
            .catch(() => {
              appHistory.push({ pathname: paths.AUTH });
              return Promise.reject(parseApiError(error));
            });
        }
      }
    }

    if (error.response.status >= 500) {
      notification.error({
        message: 'Server error',
      });
    }

    return Promise.reject(parseApiError(error));
  }
);

export default apiInstance;
