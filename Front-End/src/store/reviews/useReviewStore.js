// src/store/foodTruckStore.js

// 일반 코드

import {create} from 'zustand';
import axios from 'axios';

const useReviewStore = create((set) => ({
  Reviews: [],

  // 리뷰 작성 요청
  CreateReview: async (newReview) => {
    const response = await axios.post('/api/review', newReview);
    set((state) => ({
      Reviews: [...state.Reviews, response.data],
    }));
  },

  // 리뷰 목록 조회 요청
  getAllReview: async () => {
    const response = await axios.get('/api/review');
    set({ Reviews: response.data });
  },

  // 트럭 삭제 요청
  deleteReview: async (id) => {
    await axios.delete(`/api/review/${id}`);
    set((state) => ({
      Reviews: state.Reviews.filter(review => review.id !== id),
    }));
  },
}));

export default useReviewStore;