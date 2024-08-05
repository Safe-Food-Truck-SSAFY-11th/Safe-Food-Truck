import { create } from 'zustand';
import axiosInstance from 'utils/axiosInstance';

const customerOrderStore = create((set) => ({
    pastOrders: [],
    orderDetail: null,
    
    // 내 주문 목록 전체 조회
    getMyOrders: async () => {
      try {

        const response = await axiosInstance.get('orders/customers');
    
        set({pastOrders: response.data });

      } catch (error) {
        console.error('주문 목록 가져오기 실패 했습니다', error);
      }
    },
  
    // 주문 상세 조회
    getOrderDetails: async (orderId) => {
      try {
        const response = await axiosInstance.get(`'/api/orders/${orderId}'`);
        set({ orderDetail: response.data });
        
        console.log(response.data)

      } catch (error) {
        console.error('주문 상세조회에 실패 했습니다', error);
        
      }
    },
  
  }));
  
  export default customerOrderStore;
