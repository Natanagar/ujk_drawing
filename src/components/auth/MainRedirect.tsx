import React from 'react';
import { Redirect } from 'react-router-dom';
import { getAuthToken } from '../../model/authHelpers';
import * as paths from '../../router/paths';

interface MainRedirectProps {}

const MainRedirect: React.FC<MainRedirectProps> = () => {
  const { accessToken } = getAuthToken() as any;

  return !accessToken ? (
    <Redirect to={paths.AUTH} />
  ) : (
    <Redirect to={paths.MAIN} />
  );
};

export default MainRedirect;
