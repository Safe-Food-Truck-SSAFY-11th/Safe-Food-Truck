import { create } from 'zustand';

const useStatusStore = create((set) => ({
    status: 'beforeOpen', // 초기 상태
    setStatus: (newStatus) => set({ status: newStatus })
}));

export default useStatusStore;
