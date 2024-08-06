import { useState } from 'react';
import axiosInstance from 'utils/axiosInstance';

const useReviewStore = () => {
  const [currentReview, setCurrentReview] = useState({
    content: '',
    rating: 0,
    is_visible: 1,
  });

  // 리뷰 작성하는 함수
  const createReview = async (newReview) => {
    try {
      const response = await axiosInstance.post('/reviews', newReview);
      setCurrentReview((state) => ({ ...state, reviews: [...state.reviews, response.data] }));
      console.log(response.data)
    } catch (error) {
      console.error('리뷰 작성에 실패했습니다', error);
      throw error;
    }
  };

  // 현재 리뷰 수정 해서 적용
  const updateCurrentReview = (field, value) => {
    setCurrentReview((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return {
    currentReview,
    createReview,
    updateCurrentReview,
  };
};

export default useReviewStore;
