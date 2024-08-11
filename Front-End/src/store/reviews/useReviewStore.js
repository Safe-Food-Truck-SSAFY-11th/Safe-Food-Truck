import { create } from 'zustand';
import axiosInstance from 'utils/axiosInstance';

const useReviewStore = create((set) => ({
  myReviews: [],
  selectedReview: null,

  currentReview: {
    content: '',
    is_visible: 1,
    rating: 0,
    savedPath: 'empty',
    savedUrl: 'empty',
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
      console.log(response.data);
      set((state) => ({
        myReviews: [...state.myReviews, response.data],
        currentReview: {
          content: '',
          is_visible: 1,
          rating: 0,
          savedPath: 'empty',
          savedUrl: 'empty',
        },
      }));
    } catch (error) {
      console.error('리뷰 작성에 실패 했습니다', error);
    }
  },

  // 리뷰 삭제하기
  deleteReview: async (reviewId) => {
    try {
      await axiosInstance.delete(`/reviews/${reviewId}`);
      set((state) => ({
        myReviews: state.myReviews.filter((review) => review.id !== reviewId),
      }));
    } catch (error) {
      console.error('리뷰 삭제에 실패했습니다', error);
    }
  },

  // 리뷰 신고하기 함수
  reportReview: async () => {
    try {
      await axiosInstance.post(`/reviews`);
      console.log('리뷰 신고 성공');
    } catch (error) {
      console.error('리뷰 신고 실패');
    }
  },

  // 리뷰 신고여부 체크
  isReportedReview: async (reviewId) => {
    try {
      const response = await axiosInstance.get(`/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      console.error('리뷰 신고여부 체크 실패', error);
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
