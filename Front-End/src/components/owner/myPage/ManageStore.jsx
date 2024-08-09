import { useNavigate } from 'react-router-dom';
import styles from './ManageStore.module.css';

const ManageStore = ({ modalClose }) => {
    const navigate = useNavigate();

    const handleOutsideClick = (e) => {
        if (e.target.className === styles.Modal) {
            modalClose();
        }
    };

    const handleTruckUpdateClick = () => {
        navigate("/manageTruck");
    };

    const handleSchedule = () => {
        navigate('/manageSchedule');
    }

    return (
        <>
            <div className={styles.Modal} onClick={handleOutsideClick}>
                <div className={styles.modalContent}>
                    <button onClick={handleTruckUpdateClick}>
                        점포 정보 수정
                    </button>
                    <button onClick={handleSchedule}>
                        스케줄 관리
                    </button>
                </div>
            </div>
        </>
    );
};

export default ManageStore;
