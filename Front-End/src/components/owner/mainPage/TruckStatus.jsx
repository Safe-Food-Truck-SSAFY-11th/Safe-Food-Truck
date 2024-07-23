import styles from './TruckStatus.module.css';
import useStatusStore from '../../../store/trucks/statusStore';

const TruckStatus = () => {

    const { status, setStatus } = useStatusStore();

    // 푸드트럭 상태에 따른 문구 변경
    const renderStatusComment = () => {
        switch (status) {
            case 'beforeOpen':
                return (
                    <span>
                        트럭이 장사를 종료했어요 😴
                    </span>
                );
            default:
                return (
                    <span>
                        트럭이 장사를 시작했어요 👍
                    </span>
                );
        }
    }

    // 오늘 날짜 가져오기
    const getFormattedDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const weekDay = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
        return `${year}. ${month}. ${day} ${weekDay}요일`;
    };

    const formattedDate = getFormattedDate();

    return (
        <div className={styles.truckStatus}>
            <div className={styles.chatBtn}>
                <span role="img" aria-label="chat" className={styles.chatIcon}>💬</span>
                <p>채팅방</p>
            </div>
            <div className={styles.statusText}>
                <p>
                    오늘은 <span className={styles.inputText}>{formattedDate}</span> 입니다
                </p>
                <p>
                    <span className={styles.inputText}>울퉁불퉁</span> {renderStatusComment()}
                </p>
            </div>
        </div>
    );
};

export default TruckStatus;
