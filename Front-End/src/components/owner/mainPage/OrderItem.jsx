import styles from './OrderItem.module.css';

const OrderItem = ({ status, orderTime, menus, orderNumber, completeTime }) => {
    const renderButtons = () => {
        switch (status) {
            case 'new':
                return (
                    <div className={styles.buttons}>
                        <button className={styles.acceptButton}>수락</button>
                        <button className={styles.rejectButton}>거절</button>
                    </div>
                );
            case 'inProgress':
                return (
                    <div className={styles.buttons}>
                        <button className={styles.completeButton}>조리완료</button>
                        <button className={styles.rejectButton} disabled>거절</button>
                    </div>
                );
            case 'cooked':
                return (
                    <div className={styles.buttons}>
                        <button className={styles.pickupButton}>픽업완료</button>
                        <button className={styles.rejectButton} disabled>거절</button>
                    </div>
                );
            case 'completed':
                return null;
            default:
                return null;
        }
    };

    const renderMenus = () => {
        if (menus.length > 1) {
            return `${menus[0]} 외 ${menus.length - 1}개`;
        }
        return menus[0];
    };

    return (
        <div className={`${styles.orderItem} ${styles[status]}`}>
            <div className={styles.header}>
                <span className={styles.statusText}>{status === 'new' ? '새로운 주문' : status === 'inProgress' ? '주문 진행 중' : status === 'cooked' ? '조리 완료' : '픽업 완료'}</span>
                <span className={styles.orderTime}>주문한 시간 : {orderTime}</span>
            </div>
            <p className={styles.menus}>{renderMenus()}</p>
            <div className={styles.footer}>
                <div>
                    {orderNumber && <p className={styles.orderNumber}>주문번호 {orderNumber}</p>}
                </div>
                {completeTime && <p className={styles.completeTime}>주문 완료 : {completeTime}</p>}
                {renderButtons()}
            </div>
        </div>
    );
};

export default OrderItem;