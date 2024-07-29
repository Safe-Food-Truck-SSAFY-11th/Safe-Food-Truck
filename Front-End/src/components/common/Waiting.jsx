import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Waiting.module.css';
import logo from '../../assets/images/truck-logo.png';  // 이미지 파일 import

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
            <div className={styles.back}>
                <div className={styles.background}>
                    <h1 className={styles.title1}>
                        SAFE
                    </h1>
                    <h1 className={styles.title2}>
                        FOOD
                    </h1>
                    <h1 className={styles.title3}>
                        TRUCK
                    </h1>
                </div>
            </div>
            <img src={logo} className={styles.busLogo} />
            <p className={styles.footerText}>safe-food-truck</p>
        </div>
    );
};

export default Waiting;
