import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "utils/axiosInstance";

const useLiveStore = create(
  persist(
    (set) => ({
      // 라이브 세션 없는 경우 띄우는 모달 컨트롤
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
      fetchIsLive: async (sessionId) => {
        const response = await axiosInstance.get(`/sessions/isLive/${sessionId}`);
        const isLive = response.data;
        return isLive;
      },
      makeLive: async (sessionId) => {
        const response = await axiosInstance.post(`/sessions`, 
          { customSessionId: sessionId },
          { headers: { "Content-Type": "application/json" },
        }
      );
        return response.data;
      },
      makeToken: async (sessionId) => {
        const response = await axiosInstance.post(`/sessions/${sessionId}`);
        return response;
      },
      closeLive: async (sessionId) => {
        const response = await axiosInstance.post(`/sessions/${sessionId}/close`);
        return response.data;
      },

      // 공지 모달 컨트롤
      isNoticeOpen: false,
      openNoticeModal: () => set({ isNoticeOpen: true }),
      closeNoticeModal: () => set({ isNoticeOpen: false }),

      // 방송 시작 실패 여부
      isLiveFailed: false,
      setIsLiveFailed: (isLiveFailed) => set({ isLiveFailed: isLiveFailed }),

      // 트럭 정보 로딩
      truckInfo: {}, // 초기 트럭 정보 상태
      fetchTruckInfo: async (storeId) => {
        try {
          const response = await axiosInstance.get(`/stores/${storeId}`);

          set((state) => ({
            truckInfo: response.data,
          }));

          return response.data;
        } catch (error) {
          console.error("트럭 가져오는데 실패 했음 ㅠㅜ", error);
        }
      },

      //현재 세션 저장
      storeSession: null,
      setStoreSession: (session) => set({ storeSession: session }),
      leaveSessionStore: () =>
        set((state) => {
          if (state.storeSession) {
            state.storeSession.disconnect();
            console.log(state.storeSession);
          }

          return { storeSession: null };
        }),
    }),
    {
      name: "truck-info-store", // sessionStorage에 저장될 키 이름
      getStorage: () => sessionStorage, // sessionStorage에 저장
      partialize: (state) => ({ truckInfo: state.truckInfo }), // truckInfo만 저장
    }
  )
);

export default useLiveStore;
