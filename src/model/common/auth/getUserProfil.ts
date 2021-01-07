import apiInstance from '../apiInstance';
import { getAuthToken } from '../../authHelpers';

interface TokenParams {
  secret: string;
}

const getUserProfil = async () => {
  const { accessToken } = getAuthToken() as any;
  const getUserProfilRequiest = await apiInstance.get(
    `user/profile?secret_token=${accessToken}`
  );
  console.log(getUserProfilRequiest.data);
  return getUserProfilRequiest.data;
};
export default getUserProfil;
