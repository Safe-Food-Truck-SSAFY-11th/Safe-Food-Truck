import { useNavigate } from 'react-router-dom';
import userStore from 'store/users/userStore';
import styles from './Membership.module.css';


const Membership = () => {
    const navigate = useNavigate();
    const { joinMembership, extendMembership, deactivateMembership } = userStore();

    const handleJoinClick = () => {
        const confirmed = window.confirm('가입하시겠습니까?');
        if (confirmed) {
            joinMembership(navigate);
        }
    };

    const handleExtendClick = () => {
        const confirmed = window.confirm('연장하시겠습니까?');
        if (confirmed) {
            extendMembership(navigate);
        }
    }

    const handleDeactivateClick = () => {
        const confirmed = window.confirm('정말 탈퇴하시겠습니까?');
        if (confirmed) {
            deactivateMembership(navigate);
        }
    }

    const handleGoBack = () => {
        navigate(-1);
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>멤버십 페이지</h2>
            <div>
                <button className={styles.button} onClick={handleJoinClick}>가입하기</button>
                <button className={styles.button} onClick={handleExtendClick}>연장하기</button>
                <button className={styles.button} onClick={handleDeactivateClick}>탈퇴하기</button>
            </div>
            <button onClick={handleGoBack}>뒤로가기</button>
        </div>
    );
}

export default Membership;