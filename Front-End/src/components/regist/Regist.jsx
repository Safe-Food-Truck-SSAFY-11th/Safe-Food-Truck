import styles from './Regist.module.css';
import { useNavigate } from 'react-router-dom';
import RegistUser from './RegistUser';
import RegistOwner from './RegistOwner';
import useUserStore from '../../store/users/userStore';

const Regist = () => {
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        if (!isGuest) {
            // 회원가입 axios POST
            navigate('/registTruck');
        } else {
            // 회원가입 axios POST
            navigate('/login');
        }
    };

    const { isGuest, setGuest, setOwner } = useUserStore();

    return (
        <div className={`${styles.registContainer} ${isGuest === false ? styles.ownerBackground : ''}`}>
            <div className={styles.contentContainer}>
                <div className={styles.imageUpload}>
                    <img src="" alt="이미지 업로드" />
                    <p>image</p>
                </div>
                <div className={styles.optionContainer}>
                    <span
                        className={`${styles.option} ${isGuest ? styles.guestActive : styles.inactive}`}
                        onClick={setGuest}
                    >
                        손님이에요?
                    </span>
                    <span className={styles.divider}>|</span>
                    <span
                        className={`${styles.option} ${!isGuest ? styles.ownerActive : styles.inactive}`}
                        onClick={setOwner}
                    >
                        사장님이에요?
                    </span>
                </div>
                {isGuest ? <RegistUser /> : <RegistOwner />}
                <div className={styles.buttonContainer}>
                    <button type="button" className={styles.joinButton} onClick={handleRegisterClick}>함께하기</button>
                    <button type="button" className={styles.cancelButton}>돌아가기</button>
                </div>
            </div>
        </div>
    );
};

export default Regist;