import axios from 'utils/axiosInstance';
import { create } from 'zustand';

const useOrderStore = create((set) => ({
    nowOrderList: [],
    pastOrderList: [],

    getOrderList: async () => {
        try {
            const response = await axios.get(`orders/owners`);

            const unformattedToday = new Date().toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' });
            const [year, month, day] = unformattedToday.split('. ').map(part => part.replace('.', '').trim());

            const today = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
            
            const orders = response.data.ownerOrderResponseDtos;

            const nowOrders = orders.filter(order => order.orderTime.split('T')[0] === today);
            const pastOrders = orders.filter(order => order.orderTime.split('T')[0] !== today);

            set({ nowOrderList: nowOrders, pastOrderList: pastOrders });

        } catch (error) {
            console.error("주문 목록 가져오기 실패", error);
        }
    },

    acceptOrder: async (orderId) => {
        try {
            const response = await axios.patch(`orders/${orderId}/accept`);
            console.log("주문 수락 성공", response.data);
            set((state) => ({
                nowOrderList: state.nowOrderList.map(order =>
                    order.orderId === orderId ? { ...order, status: 'accepted', cookingStatus: 'preparing' } : order
                )
            }));
        } catch (error) {
            console.error("주문 수락 실패", error);
        }
    },

    rejectOrder: async (orderId) => {
        try {
            const response = await axios.patch(`orders/${orderId}/reject`);
            console.log("주문 거절 성공", response.data);
            set((state) => ({
                nowOrderList: state.nowOrderList.map(order =>
                    order.orderId === orderId ? { ...order, status: 'rejected' } : order
                )
            }));
        } catch (error) {
            console.error("주문 거절 실패", error);
        }
    },

    completeCooking: async (orderId) => {
        try {
            const response = await axios.patch(`orders/${orderId}/complete`);
            console.log("조리 완료 성공", response.data);
            set((state) => ({
                nowOrderList: state.nowOrderList.map(order =>
                    order.orderId === orderId ? { ...order, cookingStatus: 'completed', completeTime: response.data.completeTime } : order
                )
            }));
        } catch (error) {
            console.error("조리 완료 실패", error);
        }
    }

}))

export default useOrderStore;
