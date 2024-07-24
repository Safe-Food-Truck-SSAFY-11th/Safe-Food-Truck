import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Waiting.module.css';
import logo from '../../assets/images/sft-logo.png';  // 이미지 파일 import

const Waiting = () => {
    const navigate = useNavigate();

    // 1.5초 후 로그인화면으로 이동
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login');
        }, 1500);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className={styles.waitingContainer}>
            <img src={logo} alt="세이푸트" className={styles.waitingImage} />
            <h1 className={styles.title}>세이푸트</h1>
            <p className={styles.subtitle}>safe-food-truck</p>
        </div>
    );
};

export default Waiting;