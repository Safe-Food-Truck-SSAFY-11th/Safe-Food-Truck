import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SocialRedirection = () => {
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get('code');

    useEffect(() => {
        const fetchKakaoCode = async () => {
            try {
                console.log(code);
                const response = await axios.post(`http://localhost:8080/api/oauth/kakao/code?code=${code}`);
                if (response.status === 200) {
                    console.log(response.data);
                    sessionStorage.setItem('email', response.data.email);
                    navigate('/socialRegist', { state: { method: 'kakao' }});
                }
            } catch (error) {
                console.error('카카오 코드 요청 실패:', error);
            }
        };

        fetchKakaoCode();
    }, [code, navigate]);

    return (
        <div>
            <h2>로그인 중 ...</h2>
        </div>
    )
}

export default SocialRedirection;