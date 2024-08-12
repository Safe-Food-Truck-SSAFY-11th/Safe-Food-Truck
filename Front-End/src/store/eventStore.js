import { create } from 'zustand';

const useEventStore = create((set, get) => ({
    // (사장님) 주문 들어왔을때
    ownerOrderNotice: false,
    ownerOrderNoticeMessage: null,
    setOwnerOrderNotice: (ownerOrderNotice) => set({ ownerOrderNotice }),
    setOwnerOrderNoticeMessage: (ownerOrderNoticeMessage) => set({ ownerOrderNoticeMessage }),
}));

export default useEventStore;

