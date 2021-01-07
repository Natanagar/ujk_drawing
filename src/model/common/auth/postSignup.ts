import apiInstance from '../apiInstance';

interface SignUpProps {
  email: string;
  password: string;
}

const postSignup = async (params: SignUpProps) => {
  const postSignupRequiest = await apiInstance.post('signup', false, {
    params,
  });
  return postSignupRequiest.data;
};
export default postSignup;
