import { useNavigate } from 'react-router-dom';
import styles from './OpenClose.module.css';
import useStatusStore from '../../../store/trucks/statusStore';

const OpenClose = () => {

    const { status, setStatus } = useStatusStore();
    const navigate = useNavigate();

    const handleOpenClick = () => {
        navigate('/permitAreaCheck');
    };

    // 푸드트럭 상태에 따른 버튼 변경
    const renderButtons = () => {
        switch (status) {
            case 'beforeOpen':
                return (
                    <>
                        <button className={styles.openButton} onClick={handleOpenClick}>
                            <span role="img" aria-label="open" className={styles.icon}>🏢</span> 영업시작
                        </button>
                        <button className={styles.closeButton} disabled>
                            <span role="img" aria-label="close" className={styles.icon}>🏢</span> 영업종료
                        </button>
                    </>
                );
            case 'afterOpen':
                return (
                    <>
                        <button className={styles.openButton} onClick={() => setStatus('broadcasting')}>
                            <span role="img" aria-label="broadcastStart" className={styles.icon}>📹</span> 방송시작
                        </button>
                        <button className={styles.closeButton} onClick={() => setStatus('beforeOpen')}>
                            <span role="img" aria-label="close" className={styles.icon}>🏢</span> 영업종료
                        </button>
                    </>
                );
            case 'broadcasting':
                return (
                    <>
                        <button className={styles.openButton} onClick={() => setStatus('afterOpen')}>
                            <span role="img" aria-label="broadcastEnd" className={styles.icon}>📹</span> 방송종료
                        </button>
                        <button className={styles.closeButton} onClick={() => setStatus('beforeOpen')}>
                            <span role="img" aria-label="close" className={styles.icon}>🏢</span> 영업종료
                        </button>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.openCloseContainer}>
            {renderButtons()}
        </div>
    );
};

export default OpenClose;
