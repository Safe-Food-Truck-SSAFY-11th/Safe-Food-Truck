import { create } from 'zustand';
import axiosInstance from 'utils/axiosInstance'; // axiosInstance 파일의 경로에 맞게 수정

const useFoodTruckStore = create((set) => ({
  foodTrucks: [],
  selectedTruck: null,
  selectedTruckMenus: [], // 추가: 선택된 트럭의 메뉴 저장

  // 트럭 등록 요청
  addFoodTruck: async (newTruck) => {
    try {
      const response = await axiosInstance.post('/foodtrucks', newTruck);
      set((state) => ({
        foodTrucks: [...state.foodTrucks, response.data],
      }));
    } catch (error) {
      console.error('트럭 추가에 실패 ㅠㅜ', error);
    }
  },

  // 트럭 상세조회 요청
  getFoodTruck: async (storeId) => {
    try {
      const response = await axiosInstance.get(`/stores/${storeId}`);
      // console.log(response);
      // console.log(response.data);
      set((state) => ({
        selectedTruck: response.data,
      }));
    } catch (error) {
      console.error('트럭 가져오는데 실패 했음 ㅠㅜ', error);
    }
  },

  // 트럭 메뉴 조회 요청
  getFoodTruckMenus: async (storeId) => {
    try {
      const response = await axiosInstance.get(`/stores/${storeId}/menus`);
      console.log(response.data);
      set((state) => ({
        selectedTruckMenus: response.data,
      }));
    } catch (error) {
      console.error('트럭 메뉴 가져오는데 실패 했음 ㅠㅜ', error);
    }
  },

  // 트럭 목록 조회 요청
  fetchFoodTrucks: async () => {
    try {
      const response = await axiosInstance.get('/foodtrucks');
      set({ foodTrucks: response.data });
    } catch (error) {
      console.error('트럭 목록 가져오는데 실패 ㅠㅜ', error);
    }
  },

  // 트럭 정보 수정 요청
  updateFoodTruck: async (updatedTruck) => {
    try {
      const response = await axiosInstance.put(`/foodtrucks/${updatedTruck.id}`, updatedTruck);
      set((state) => ({
        foodTrucks: state.foodTrucks.map(truck =>
          truck.id === updatedTruck.id ? response.data : truck
        ),
      }));
    } catch (error) {
      console.error('Error updating food truck:', error);
    }
  },

  // 트럭 삭제 요청
  deleteFoodTruck: async (id) => {
    try {
      await axiosInstance.delete(`/foodtrucks/${id}`);
      set((state) => ({
        foodTrucks: state.foodTrucks.filter(truck => truck.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting food truck:', error);
    }
  },

  // 영업중인 푸드트럭 요청
  openFoodTruck: async () => {
    try {
      const response = await axiosInstance.get('/stores/open/all');
      const openFoodTrucks = response.data;

      set((state) => ({
        foodTrucks: openFoodTrucks
      }));
    } catch (error) {
      console.error('못 가져 왔어용', error);
    }
  }
}));

export default useFoodTruckStore;
