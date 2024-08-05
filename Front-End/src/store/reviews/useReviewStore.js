import { create }from 'zustand';
import axiosInstance from 'utils/axiosInstance';


const useReviewStore = create((set) => ({
  myReviews: [],
  
  // 내가 작성한 리뷰 전체 조회
  getAllMyReview: async () => {
    try {
      const response = await axiosInstance.get('/reviews');
      set({ myReviews: response.data });

    } catch (error) {
      console.error('리뷰 가져오기 실패 했습니다', error);
    }
  },
  // 리뷰 작성하기
  createReview: async (newReview) => {
    try {
      const response = await axiosInstance.post('/reviews', newReview);
      set((state) => ({ reviews: [...state.reviews, response.data] }));
    } catch (error) {
      console.error('리뷰 작성에 실패 했습니다', error);
      
    }
  },

  // 리뷰 삭제하기
  deleteReview: async (reviewId) => {
    try {
      await axiosInstance.delete(`/reviews/${reviewId}`);
      set((state) => ({
        reviews: state.reviews.filter(review => review.id !== reviewId)
      }));
    } catch (error) {
      console.error('리뷰 삭제에 실패했습니다', error);
      
    }
  },
}));

export default useReviewStore;
