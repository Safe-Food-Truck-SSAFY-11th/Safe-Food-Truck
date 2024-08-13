import { useEffect } from 'react';
import OrderItem from './OrderItem';
import styles from './JiguemOrder.module.css';
import barcodeImg from '../../../assets/images/barcode.png';
import useTruckStore from "store/users/owner/truckStore";
import useOrderStore from 'store/users/owner/orderStore';
import useEventStore from 'store/eventStore';

const JiguemOrder = () => {
    const { truckInfo } = useTruckStore();
    const { nowOrderList, getOrderList } = useOrderStore();
    const { ownerOrderNotice, setOwnerOrderNotice } = useEventStore();

    useEffect(() => {
        getOrderList();
    }, []);

    useEffect(() => {
        if (ownerOrderNotice) {
            getOrderList();
            setOwnerOrderNotice(false);
        }
    }, [ownerOrderNotice]);

    // 상태 우선순위 정의
    const getStatusPriority = (order) => {
        switch (order.status) {
            case 'pending':
                return 0;
            case 'accepted':
                if (order.cookingStatus === 'preparing') {
                    return 1;
                } else if (order.cookingStatus === 'completed') {
                    return 2;
                }
                return 1;
            case 'rejected':
                return 3;
            default:
                return 4;
        }
    };

    // nowOrderList를 1. 상태 2. ID 내림차순 기준으로 정렬
    const sortedOrderList = [...nowOrderList].sort((a, b) => {
        const statusComparison = getStatusPriority(a) - getStatusPriority(b); // 상태 오름차순
        if (statusComparison !== 0) return statusComparison;
        return b.orderId - a.orderId; // ID 내림차순
    });

    return (
        <div className={styles.jiguemOrder}>
            <div className={styles.barcode}>
                <img src={barcodeImg} alt="barcode" />
            </div>
            {!truckInfo.isOpen || sortedOrderList.length === 0 ? (
                <p className={styles.orderComment}>들어온 주문이 없어요 <span role="img" aria-label="sad">😢</span></p>
            ) : (
                <>
                    <p className={styles.orderComment}>주문이 들어왔어요!</p>
                    {sortedOrderList.map((order, index) => (
                        <OrderItem
                            key={index}
                            order={order}
                        />
                    ))}
                </>
            )}
        </div>
    );
};

export default JiguemOrder;
