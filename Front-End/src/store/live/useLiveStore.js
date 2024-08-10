import { create } from "zustand";
import axiosInstance from "utils/axiosInstance";

const useLiveStore = create((set) => ({
  //라이브 세션 없는 경우 띄우는 모달 컨트롤
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  ownerNickname: "",
  notice: "",
  setNotice: (notice) => set({ notice: notice }),

  // 공지 로딩
  fetchNotice: async (storeId) => {
    try {
      const response = await axiosInstance.get(`/stores/${storeId}/notice`);
      const { ownerNickname, notice } = response.data;

      // 상태 업데이트
      set({ ownerNickname: ownerNickname, notice: notice.trim() });
      console.log("공지 로딩 성공", notice);
    } catch (error) {
      console.error("공지 로딩 중 오류 발생:", error);
    }
  },

  //공지 모달 컨트롤
  isNoticeOpen: false,
  openNoticeModal: () => set({ isNoticeOpen: true }),
  closeNoticeModal: () => set({ isNoticeOpen: false }),

  //방송 시작 실패여부
  isLiveFailed: false,
  setIsLiveFailed: (isLiveFailed) => set({ isLiveFailed: isLiveFailed }),

  //현재 라이브 참여자 목록
  members: new Set(), // 초기 상태로 Set 사용

  addMember: (email) =>
    set((state) => {
      // const newMembers = new Set(state.members); // 기존 Set 복사
      // newMembers.add(email); // 새로운 멤버 추가
      return { members: state.members?.add(email) }; // 상태 업데이트
    }),

  deleteMember: (email) =>
    set((state) => {
      // const newMembers = new Set(state.members); // 기존 Set 복사
      // newMembers.delete(email); // 멤버 삭제
      return { members: state.members.delete(email) }; // 상태 업데이트
    }),

  resetMembers: () =>
    set((state) => {
      return { members: state.members?.clear() }; // 셋 초기화
    }),
}));

export default useLiveStore;
