import { create } from 'zustand';
import axios from 'utils/axiosInstance';

const useOwnerReviewStore = create(() => ({
    getReviewList: async (storeId) => {
        try {
            const response = await axios.get(`reviews/${storeId}`);
            return response.data.reviewList;
        } catch (error) {
            console.error("리뷰 조회 실패", error);
        }
    },
}));

export default useOwnerReviewStore;
