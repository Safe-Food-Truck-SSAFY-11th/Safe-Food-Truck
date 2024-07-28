import { create } from "zustand";

const useTruckStore = create((set) => ({
  form: {
    storeName: "",
    category: "",
    menu: "",
    workingDays: [],
    description: "",
    image: null,
  },
  setForm: (name, value) =>
    set((state) => ({
      form: { ...state.form, [name]: value },
    })),
  setImage: (image) =>
    set((state) => ({
      form: { ...state.form, image },
    })),
  toggleWorkingDay: (day) =>
    set((state) => ({
      form: {
        ...state.form,
        workingDays: state.form.workingDays.includes(day)
          ? state.form.workingDays.filter((d) => d !== day)
          : [...state.form.workingDays, day],
      },
    })),
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
