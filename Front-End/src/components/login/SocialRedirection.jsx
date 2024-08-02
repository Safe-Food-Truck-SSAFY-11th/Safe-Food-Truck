import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'utils/axiosInstance';
import useUserStore from 'store/users/userStore';

const SocialRedirection = () => {
    const navigate = useNavigate();
    const provider = new URL(window.location.href).searchParams.get('provider');
    const { fetchUser } = useUserStore();

    useEffect(() => {
        const socialLogin = async () => {
            try {
                let response;
                if (provider === 'kakao') {
                    const code = new URL(window.location.href).searchParams.get('code');
                    response = await axios.post(`oauth/kakao/code?code=${code}`);
                } else if (provider === 'google') {
                    const params = new URLSearchParams(window.location.hash.slice(1));
                    const access_token = params.get('access_token');
                    response = await axios.post(`oauth/google/access-token?access_token=${access_token}`);
                }

                if (response.status === 200) {
                    sessionStorage.setItem('email', response.data.email);
                    navigate('/socialRegist', { state: { method: provider } });
                } 
            } catch (error) {
                if (error.response.status === 303) {
                    // 이미 가입된 회원
                    sessionStorage.setItem('token', error.response.data.token);
                    fetchUser();
                    navigate('/login');
                } else {
                    console.error('카카오 코드 요청 실패:', error);
                }
            }
        };

        socialLogin();
    }, [navigate]);

    return (
        <div>
            <h2>로그인 중 ...</h2>
        </div>
    )
}

export default SocialRedirection;