import { create } from "zustand";
import axios from 'axios';

const useTruckStore = create((set) => ({
  registForm: {
    name: "",
    storeType: "",
    offDay: "0000000",
    description: "",
    safetyLicenseNumber: "",
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
      registForm: {
        ...state.registForm,
        [name]: value,
      },
    })),
  setImage: (imageURL) =>
    set((state) => ({
      registForm: {
        ...state.registForm,
        image: imageURL,
      },
    })),
  toggleWorkingDay: (dayIndex) =>
    set((state) => {
      const { offDay } = state.registForm;
      const newOffDay = offDay.split('').map((day, index) =>
        index === dayIndex ? (day === "0" ? "1" : "0") : day
      ).join('');
      return {
        registForm: {
          ...state.registForm,
          offDay: newOffDay,
        },
      };
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

  registTruck: async (truckData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/stores', truckData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          }
        });
      return response.data;
    } catch (error) {
      console.log(truckData);
      console.error('점포등록 오류:', error);
      throw error;
    }
  },

}));

export default useTruckStore;
