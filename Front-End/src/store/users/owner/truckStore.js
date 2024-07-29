import { create } from "zustand";

const useTruckStore = create((set) => ({
  registForm: {
    storeName: "",
    category: "",
    workingDays: "",
    description: "",
    image: null,
  },
  updateForm: {
    storeName: "울퉁불퉁",
    category: "꼬치",
    menus: [{
      menuName: "마늘꼬치",
      price: 1000,
      description: "진짜 맛있는 꼬치",
    }],
    workingDays: "0101010",
    description: "맛있는 푸드트럭",
    image: null,
  },
  setForm: (name, value) =>
    set((state) => ({
      registForm: { ...state.registForm, [name]: value },
    })),
  setImage: (image) =>
    set((state) => ({
      registForm: { ...state.registForm, image },
    })),
  toggleWorkingDay: (dayIndex) => set((state) => {
    const workingDaysArray = state.updateForm.workingDays.split('');
    workingDaysArray[dayIndex] = workingDaysArray[dayIndex] === '1' ? '0' : '1';
    return { updateForm: { ...state.updateForm, workingDays: workingDaysArray.join('') } };
  }),
  activeTab: "today",
  setActiveTab: (tab) => set({ activeTab: tab }),
  categories: [
    "분식",
    "치킨",
    "꼬치",
    "아이스크림",
    "호떡",
    "타코야끼",
    "붕어빵",
    "음료",
    "크레페",
    "컵밥",
    "스테이크",
    "피자",
  ],
}));

export default useTruckStore;
