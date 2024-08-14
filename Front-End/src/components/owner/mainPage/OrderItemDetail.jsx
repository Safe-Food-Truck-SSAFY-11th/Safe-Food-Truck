import React from 'react';
import styles from './OrderItemDetail.module.css';

const OrderItemDetail = ({ order, onClose }) => {
    const renderMenus = () => {
        return order.orderMenuListResponseDto.orderMenuResponseDtos.map((menu, index) => (
            <div key={index} className={styles.orderMenu}>
                {menu.menuName} {menu.count}개
            </div>
        ));
    };

    const handleOverlayClick = (e) => {
        onClose();
    };

    const handleModalClick = (e) => {
        e.stopPropagation(); // 이벤트 전파를 중단하여 모달 내부를 클릭해도 닫히지 않도록 함
    };

    return (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modalContent} onClick={handleModalClick}>
                <button className={styles.closeButton} onClick={onClose}>×</button> {/* X 표시 버튼 추가 */}
                <div className={styles.header}>
                    <span className={styles.orderTime}>주문 시간 : {order.orderTime.replace('T', ' ')}</span>
                </div>
                <p className={styles.menus}>{renderMenus()}</p>
                {order.request && <p className={styles.menus}>요청사항 : <span className={styles.request}>{order.request}</span></p>}
                
                <div className={styles.footer}>
                    <div>
                        {order.orderId && <p className={styles.orderNumber}>주문번호 {order.orderId}</p>}
                        {order.completeTime && <p className={styles.completeTime}>주문 완료 : {order.completeTime.replace('T', ' ')}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderItemDetail;
