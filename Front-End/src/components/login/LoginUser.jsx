import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginUser.module.css';
import logo from '../../assets/images/sft-logo.png';
import kakaoLogo from '../../assets/images/icon_kakao.png';
import googleLogo from '../../assets/images/icon_google.png';
import useUserStore from '../../store/users/userStore';

const LoginUser = () => {
    const { isGuest, setGuest, setOwner } = useUserStore();
    const navigate = useNavigate();

    // 컴포넌트가 마운트될 때 isGuest를 false로 설정(사장님 먼저)
    useEffect(() => {
        setOwner();
    }, [setOwner]);

    const handleRegisterClick = () => {
        navigate('/regist');
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
                <input type="text" placeholder="이메일" className={styles.input} />
            </div>
            <div className={styles.inputContainer}>
                <input type="password" placeholder="비밀번호" className={styles.input} />
            </div>
            <button className={`${styles.loginButton} ${isGuest === false ? styles.ownerLoginButton : ''}`}>로그인</button>
            <div className={styles.socialLoginContainer}>
                <p className={`${styles.socialLoginText} ${isGuest === false ? styles.ownerSocialLoginText : ''}`}>소셜 로그인</p>
                <div className={styles.socialIcons}>
                    <img src={kakaoLogo} alt="카카오톡" className={styles.socialIcon} />
                    <img src={googleLogo} alt="구글" className={styles.socialIcon} />
                </div>
            </div>
            <p className={styles.footerText}>safe-food-truck</p>
        </div>
    );
};
export default LoginUser;
