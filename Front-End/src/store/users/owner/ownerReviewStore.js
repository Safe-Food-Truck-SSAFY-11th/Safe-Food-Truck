import { create } from 'zustand';
import axios from 'utils/axiosInstance';

const useOwnerReviewStore = create(() => ({
    
    // 내 점포 리뷰 조회
    getReviewList: async (storeId) => {
        try {
            const response = await axios.get(`reviews/${storeId}`);
            return response.data.reviewResponseDtos;
        } catch (error) {
            console.error("리뷰 조회 실패", error);
        }
    },

    // 답글 등록
    submitReply: async (replyData) => {
        try {
            const response = await axios.post('replies', replyData);
            console.log(response.data);
        } catch (error) {
            console.error("답글 등록 실패: ", error)
        }
    }
}));

export default useOwnerReviewStore;
