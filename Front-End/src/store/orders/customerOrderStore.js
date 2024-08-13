import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axiosInstance from 'utils/axiosInstance';

const customerOrderStore = create(
  persist(
    (set) => ({
      pastOrders: [],
      nowOrder: null,
      nowOrderId: null,
      orderNow: null,

      setNowOrderId: (orderId) => set({ nowOrderId: orderId }),

      // 내 주문 목록 전체 조회
      getMyOrders: async () => {
        try {
          const response = await axiosInstance.get('orders/customers');
          set({ pastOrders: response.data });
        } catch (error) {
          console.error('주문 목록 가져오기 실패 했습니다', error);
        }
      },

      // 주문 상세 조회
      getOrderDetails: async (orderId) => {
        try {
          const response = await axiosInstance.get(`orders/${orderId}`);
          set({ nowOrder: response.data });
        } catch (error) {
          console.error('주문 상세조회에 실패 했습니다', error);
        }
      },
      
      // 지금 진행중인 주문 조회
      getNowOrder: async () => {
        try {
          const response = await axiosInstance.get('orders/customers/preparing');
          set({ orderNow : response.data });
        } catch (error) {
          console.error('지금 진행 주문 가져오기 실패' , error);
        }
      }



    }),
    {
      name: 'customer-order-store', // 로컬 스토리지에 저장할 키 이름
      getStorage: () => localStorage, // 기본 값으로 로컬 스토리지 사용
    }
  )
);

export default customerOrderStore;
