import { set } from "lodash";
import { create } from "zustand";

const useLiveStore = create((set) => ({
  isModalOpen: false,

  //라이브 세션 없는 경우 띄우는 모달 컨트롤
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));

export default useLiveStore;
