import styles from './OrderItem.module.css';
import useOrderStore from 'store/users/owner/orderStore';

const OrderItem = ({ order }) => {
    const { acceptOrder, rejectOrder, completeCooking } = useOrderStore();

    let status;

    // status 정의
    if (order.status === 'pending') {
        status = 'new';
    } else if (order.status === 'accepted') {
        if (order.cookingStatus === 'preparing') {
            status = 'inProgress';
        } else if (order.cookingStatus === 'completed') {
            status = 'completed';
        }
    } else if (order.status === 'rejected') {
        status = 'rejected';
    }

    const handleAcceptBtn = async () => {
        await acceptOrder(order.orderId);
    }

    const handleRejectBtn = async () => {
        await rejectOrder(order.orderId);
    }

    const handleCompleteCooking = async () => {
        await completeCooking(order.orderId);
    }

    const renderButtons = () => {
        switch (status) {
            case 'new':
                return (
                    <div className={styles.buttons}>
                        <button className={styles.acceptButton} onClick={handleAcceptBtn}>수락</button>
                        <button className={styles.rejectButton} onClick={handleRejectBtn}>거절</button>
                    </div>
                );
            case 'inProgress':
                return (
                    <div className={styles.buttons}>
                        <button className={styles.completeButton} onClick={handleCompleteCooking}>조리완료</button>
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
        if (order.orderMenuListResponseDto.orderMenuResponseDtos.length > 1) {
            return (
            <span>
                <span className={styles.orderMenu}>
                    {order.orderMenuListResponseDto.orderMenuResponseDtos[0].menuName} {order.orderMenuListResponseDto.orderMenuResponseDtos[0].count}개
                </span>
                <span>
                &nbsp;외&nbsp;{order.orderMenuListResponseDto.orderMenuResponseDtos.length - 1}개
                </span>
            </span>
            )
        } else {
            return (
                <span className={styles.orderMenu}>
                    {order.orderMenuListResponseDto.orderMenuResponseDtos[0].menuName} {order.orderMenuListResponseDto.orderMenuResponseDtos[0].count}개
                </span>
            )
        }
    }

    return (
        <div className={`${styles.orderItem} ${styles[status]}`}>
            <div className={styles.header}>
                <span className={styles.statusText}>{status === 'new' ? '새로운 주문' : status === 'inProgress' ? '주문 진행 중' : status === 'completed' ? '주문 완료' : '주문 거절'}</span>
                <span className={styles.orderTime}>주문 시간 : <br/>{order.orderTime.replace('T', ' ')}</span>
            </div>
            <p className={styles.menus}>{renderMenus()}</p>
            <div className={styles.footer}>
                <div>
                    {order.orderId && <p className={styles.orderNumber}>주문번호 {order.orderId}</p>}
                </div>
                {order.completeTime && <p className={styles.completeTime}>주문 완료 : <br/>{order.completeTime.replace('T', ' ')}</p>}
                {renderButtons()}
            </div>
        </div>
    );
};

export default OrderItem;
