import { create } from "zustand";
import axiosInstance from "utils/axiosInstance"; // axiosInstance 파일의 경로에 맞게 수정

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
  //업데이트폼 세팅
  setForm: (name, value) =>
    set((state) => ({
      updateForm: {
        ...state.updateForm,
        [name]: value,
      },
    })),
  setImage: (imageURL) =>
    set((state) => ({
      updateForm: {
        ...state.updateForm,
        image: imageURL,
      },
    })),
  //업데이트폼 토글
  toggleWorkingDay: (dayIndex) =>
    set((state) => {
      const { offDay } = state.updateForm;
      const newOffDay = offDay
        .split("")
        .map((day, index) =>
          index === dayIndex ? (day === "0" ? "1" : "0") : day
        )
        .join("");
      return {
        updateForm: {
          ...state.updateForm,
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
      const response = await axiosInstance.post("/stores", truckData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(truckData);
      console.error("점포등록 오류:", error);
      throw error;
    }
  },

  updateTruck: async () => {
    // 상태를 가져오기 위해 set을 사용
    set(async (state) => {
      try {
        const response = await axiosInstance.patch("/stores", state.updateForm); // 상태에서 updateForm을 가져옴
        return response.data; // 성공적으로 응답을 반환
      } catch (error) {
        console.log(state.updateForm); // 상태의 updateForm 출력
        console.error("점포수정 오류:", error);
        throw error; // 오류를 던짐
      }
    });
  },
  truckInfo: {}, // 초기 트럭 정보 상태
  fetchTruckInfo: async () => {
    try {
      const response = await axiosInstance.get(`stores`);
      console.log("트럭 정보 가져오기 성공", response.data);

      // 요청이 성공하면 truckInfo 상태를 업데이트
      set({ truckInfo: response.data });
      // 요청이 성공하면 updateForm 상태를 업데이트
      const { name, storeType, offDay, description, isOpen } = response.data;
      set({ updateForm: { name, storeType, offDay, description, isOpen } });
    } catch (error) {
      console.error("트럭 정보 가져오기 실패", error);
    }
  },

  // 점포 영업 상태 변경
  switchStatus: async () => {
    try {
      const response = await axiosInstance.patch("stores/open");
      console.log("점포 상태 전환 성공", response.data);
      set((state) => ({
        truckInfo: { ...state.truckInfo, isOpen: response.data },
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useTruckStore;
