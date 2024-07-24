import OrderItem from './OrderItem';
import styles from './JiguemOrder.module.css';
import barcodeImg from '../../../assets/images/barcode.png';

const JiguemOrder = () => {
    const orders = [
        { status: 'new', orderTime: '2024.07.17 17:49:59', menus: ['명란마요 타코야끼 20알'] },
        { status: 'inProgress', orderTime: '2024.07.17 17:39:59', menus: ['핵불닭 타코야끼 8알'], orderNumber: '0003' },
        { status: 'cooked', orderTime: '2024.07.17 17:47:59', menus: ['핵불닭 타코야끼 8알', '체다치즈 타코야끼 12알'], orderNumber: '0002' },
        { status: 'completed', orderTime: '2024.07.17 17:20:59', menus: ['체다치즈 타코야끼 12알'], orderNumber: '0001', completeTime: '2024.07.17 17:59:59' },
    ];
    // const orders = [];

    return (
        <div className={styles.jiguemOrder}>
            <div className={styles.barcode}>
                <img src={barcodeImg} alt="barcode" />
            </div>
            {orders.length === 0 ? (
                <p className={styles.orderComment}>들어온 주문이 없어요 <span role="img" aria-label="sad">😢</span></p>
            ) : (
                <>
                    <p className={styles.orderComment}>주문이 들어왔어요!</p>
                    {orders.map((order, index) => (
                        <OrderItem
                            key={index}
                            status={order.status}
                            orderTime={order.orderTime}
                            menus={order.menus}
                            orderNumber={order.orderNumber}
                            completeTime={order.completeTime}
                        />
                    ))}
                </>
            )}
        </div>
    );
};

export default JiguemOrder;