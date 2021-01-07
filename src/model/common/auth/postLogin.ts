import apiInstance from '../apiInstance';
import { setAuthToken } from '../../authHelpers';

interface LoginProps {
  email: string;
  password: string;
}

const postLogin = async (params: LoginProps) => {
  const postLoginRequiest = await apiInstance.post('login', false, { params });
  setAuthToken(postLoginRequiest.data.token);
  return postLoginRequiest;
};
export default postLogin;
