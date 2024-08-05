import { create } from 'zustand';
import axiosInstance from 'utils/axiosInstance'; // axiosInstance 파일의 경로에 맞게 수정

const useFoodTruckStore = create((set) => ({
  foodTrucks: [],
  selectedTruck: null,
  selectedTruckMenus: [], 

  
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
  },

  // 트럭 찜 개수 요청
  getFoodTruckLikes: async (storeId) => {
    try {
      const response = await axiosInstance.get(`favorites/${storeId}`);
      return response.data.favoriteCount;
    } catch (error) {
      console.error('찜 개수 조회 실패', error);
      return null;
    }
  }
}));

export default useFoodTruckStore;
