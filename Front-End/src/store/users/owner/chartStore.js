import { create } from "zustand";
import axios from 'utils/axiosInstance';

const useChartStore = create(() => ({
    // 주간 매출 조회
    getWeeklySales: async () => {
        try {
            const response = await axios.get('orders/owners/sales');
            return response.data;
        } catch (error) {
            console.error("주간 매출 조회 실패", error);
        }
    }


}));

export default useChartStore;