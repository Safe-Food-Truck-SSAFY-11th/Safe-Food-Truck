import { create } from 'zustand';


const useReviewImageStore = create((set) => ({
  // 전체 리뷰 이미지 목록을 저장하는 배열
  reviewImages: [],

  // 현재 작성 중인 리뷰 이미지의 상태를 저장하는 객체
  currentReviewImage: {
    id: null,
    original_filename: '',
    stored_filename: '',
    path: '',
  },

  // 전체 리뷰 이미지 목록을 설정하는 함수
  setReviewImages: (images) => set({ reviewImages: images }),

  // 현재 작성 중인 리뷰 이미지를 설정하는 함수
  setCurrentReviewImage: (image) => set({ currentReviewImage: image }),

  // 새로운 리뷰 이미지를 추가하는 함수
  addReviewImage: (image) => set((state) => ({
    reviewImages: [...state.reviewImages, image],
  })),

  // 리뷰 이미지를 삭제하는 함수
  deleteReviewImage: (id) => set((state) => ({
    reviewImages: state.reviewImages.filter(image => image.id !== id),
  })),
}));

export default useReviewImageStore;
