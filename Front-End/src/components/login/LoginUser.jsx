import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginUser.module.css';
import logo from 'assets/images/sft-logo.png';
import kakaoLogo from 'assets/images/icon_kakao.png';
import googleLogo from 'assets/images/icon_google.png';
import useUserStore from 'store/users/userStore';

const LoginUser = () => {
    const { isGuest, setGuest, setOwner, loginUser, fetchUser } = useUserStore();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // 컴포넌트가 마운트될 때 isGuest를 false로 설정(사장님 먼저)
        setOwner();
        const token = sessionStorage.getItem('token');
        // 토큰 보유 여부에 따른 리디렉션
        if (token) {
            fetchUser().then((user) => {
                if (user.role.indexOf('customer') != -1) {
                    navigate('/mainCustomer');
                } else if (user.role.indexOf('owner') != -1) {
                    navigate('/mainOwner');
                }
            }).catch((error) => {
                console.error('유저 정보 가져오기 오류:', error);
            });
        }
    }, [setOwner, navigate, fetchUser]);

    const handleRegisterClick = () => {
        navigate('/regist');
    };

    const handleLoginClick = async () => {
        try {
            const user = await loginUser(email, password);
            if (user.role.indexOf('customer') != -1) {
                navigate('/mainCustomer');
            } else if (user.role.indexOf('owner') != -1) {
                navigate('/mainOwner');
            }
        } catch (error) {
            console.error('로그인 실패:', error);
            alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
        }
    };

    // 소셜 로그인
    const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
    const kakao_uri = `${redirect_uri}?provider=kakao`;
    const google_uri = `${redirect_uri}?provider=google`;

    const handleKakaoLogin = () => {
        window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${kakao_uri}&response_type=code`
    }

    // 구글 로그인
    const handleGoogleLogin = () => {
        window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?'+
        `client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}`+
        `&redirect_uri=${google_uri}`+
        '&response_type=token&'+
        'scope=https://www.googleapis.com/auth/userinfo.email';
    };

    // 아이디 찾기
    const handleFindId = () => {
        navigate('/findId');
    };

    // 비밀번호 찾기
    const handleFindPassword = () => {
        navigate('/findPassword');
    };

    return (
        <div className={`${styles.loginContainer} ${isGuest === false ? styles.ownerBackground : ''}`}>
            <img src={logo} alt="세이푸트" className={styles.logoImage} />
            <h1 className={styles.title}>세이푸트</h1>
            <p className={styles.subtitle}>세이푸트와 함께해요! <span className={`${styles.link} ${isGuest === false ? styles.ownerLink : ''}`} onClick={handleRegisterClick}>회원가입</span></p>
            <div className={styles.optionContainer}>
                <span
                    className={`${styles.option} ${isGuest === true ? styles.guestActive : styles.inactive}`}
                    onClick={setGuest}
                >
                    손님이에요?
                </span>
                <span className={styles.divider}>|</span>
                <span
                    className={`${styles.option} ${isGuest === false ? styles.ownerActive : styles.inactive}`}
                    onClick={setOwner}
                >
                    사장님이에요?
                </span>
            </div>
            <div className={styles.inputContainer}>
                <input type="text" placeholder="이메일" className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLoginClick()} />
            </div>
            <div className={styles.inputContainer}>
                <input type="password" placeholder="비밀번호" className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLoginClick()} />
            </div>
            <button className={`${styles.loginButton} ${isGuest === false ? styles.ownerLoginButton : ''}`} onClick={handleLoginClick}>로그인</button>
            <div className={styles.findLoginInfo}>
                <p onClick={handleFindId}>아이디를 잊으셨나요?</p>
                <div>|</div>
                <p onClick={handleFindPassword}>비밀번호를 잊으셨나요?</p>
            </div>
            <div className={styles.socialLoginContainer}>
                <p className={`${styles.socialLoginText} ${isGuest === false ? styles.ownerSocialLoginText : ''}`}>소셜 로그인</p>
                <div className={styles.socialIcons}>
                    <img src={kakaoLogo} alt="카카오톡" className={styles.socialIcon} onClick={handleKakaoLogin} />
                    <img src={googleLogo} alt="구글" className={styles.socialIcon} onClick={handleGoogleLogin} />
                </div>
            </div>
            <p className={styles.footerText}>safe-food-truck</p>
        </div>
    );
};
export default LoginUser;
