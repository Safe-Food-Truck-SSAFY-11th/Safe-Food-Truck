import styles from './Regist.module.css';
import { useNavigate } from 'react-router-dom';
import RegistUser from './RegistUser';
import RegistOwner from './RegistOwner';
import useUserStore from 'store/users/userStore';
import { useState } from 'react';

const Regist = () => {
    const navigate = useNavigate();
    const { isGuest, setGuest, setOwner, fetchUser, registerUser, emailChecked, nicknameChecked, passwordMatch } = useUserStore();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        nickname: '',
        gender: null,
        birth: '',
        phoneNumber: '',
        businessNumber: null,
    });

    const handleFormChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRegisterClick = async () => {
        try {
            const currentRole = formData.businessNumber ? 'owner' : 'customer';
            const roleSpecificData = currentRole === 'customer' ? {} : { businessNumber: formData.businessNumber };
            const token = await registerUser({ ...formData, ...roleSpecificData });
            // 회원가입 후 스토리지에 바로 토큰 담아주기
            if (token) {
                sessionStorage.setItem('token', token);
                fetchUser();
            }

            navigate(currentRole === 'customer' ? '/login' : '/registTruck');
        } catch (error) {
            console.error('회원가입 실패:', error);
        }
    };

    const isFormValid = emailChecked === 'Possible' && nicknameChecked === 'Possible' && passwordMatch && (isGuest || formData.bsNumValid);

    return (
        <div className={`${styles.registContainer} ${!isGuest ? styles.ownerBackground : ''}`}>
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
                {isGuest ? (
                    <RegistUser formData={formData} onFormChange={handleFormChange} />
                ) : (
                    <RegistOwner formData={formData} onFormChange={handleFormChange} />
                )}
                <div className={styles.buttonContainer}>
                    <button type="button" className={styles.joinButton} onClick={handleRegisterClick} disabled={!isFormValid}>
                        함께하기
                    </button>
                    <button type="button" className={styles.cancelButton}>돌아가기</button>
                </div>
            </div>
        </div>
    );
};

export default Regist;
