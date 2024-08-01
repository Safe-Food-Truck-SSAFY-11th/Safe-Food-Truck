import { create } from "zustand";
import axios from "axios";

const useTruckStore = create((set) => ({
  registForm: {
    name: "",
    storeType: "",
    offDay: "0000000",
    description: "",
    safetyLicenseNumber: "",
  },
  updateForm: {
    name: "",
    storeType: "",
    offDay: "0000000",
    description: "",
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
      const newOffDay = offDay
        .split("")
        .map((day, index) =>
          index === dayIndex ? (day === "0" ? "1" : "0") : day
        )
        .join("");
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
      const response = await axios.post(
        "http://localhost:8080/api/stores",
        truckData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(truckData);
      console.error("점포등록 오류:", error);
      throw error;
    }
  },

  updateTruck: async (truckData, menus) => {
    try {
      const response = await axios.patch(
        "http://localhost:8080/api/stores",
        truckData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(truckData);
      console.error("점포수정 오류:", error);
      throw error;
    }
  },
}));

export default useTruckStore;
