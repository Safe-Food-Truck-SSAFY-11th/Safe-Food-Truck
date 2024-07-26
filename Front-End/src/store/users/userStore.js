import { create } from 'zustand';

const userStore = create((set) => ({
  isGuest: null, // 초기 상태는 null
  setGuest: () => set({ isGuest: true }),
  setOwner: () => set({ isGuest: false }),
}));

export default userStore;