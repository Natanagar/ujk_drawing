import apiInstance from '../apiInstance';
import { getAuthToken } from '../../authHelpers';

interface TokenParams {
  secret: string;
}

const getUserProfil = async () => {
  const { accessToken } = getAuthToken() as any;
  const getUserProfilRequiest = await apiInstance.get<TokenParams>(
    'user/profile',
    { params: { secret: accessToken } }
  );
  return getUserProfilRequiest.data;
};
export default getUserProfil;
