import { create } from 'zustand';
import axiosInstance from 'utils/axiosInstance';

const useReviewStore = create((set) => ({
  myReviews: [],
  currentReview: {
    content: '',
    is_visible: 1,
    rating: 0,
    savedPath: 'empty',
    savedUrl: 'empty'
  },

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
      set((state) => ({ myReviews: [...state.myReviews, response.data] }));
    } catch (error) {
      console.error('리뷰 작성에 실패 했습니다', error);
    }
  },

  // 리뷰 삭제하기
  deleteReview: async (reviewId) => {
    try {
      await axiosInstance.delete(`/reviews/${reviewId}`);
      set((state) => ({
        myReviews: state.myReviews.filter((review) => review.review_id !== reviewId),
      }));
    } catch (error) {
      console.error('리뷰 삭제에 실패했습니다', error);
    }
  },

  // 현재 리뷰 업데이트
  updateCurrentReview: (field, value) =>
    set((state) => ({
      currentReview: {
        ...state.currentReview,
        [field]: value,
      },
    })),
}));

export default useReviewStore;
