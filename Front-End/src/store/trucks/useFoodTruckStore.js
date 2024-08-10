import { create } from 'zustand';
import axiosInstance from 'utils/axiosInstance'; // axiosInstance 파일의 경로에 맞게 수정

const useFoodTruckStore = create((set) => ({
  foodTrucks: [],
  // 장사중인 푸드트럭
  openFoodTrucks: [],
  // 디테일 보려고 고른 푸드트럭
  selectedTruck: null,
  // 그 푸드트럭의 메뉴들
  selectedTruckMenus: [],
  // 그 푸드트럭의 리뷰들 
  selectedTruckReviews: [],
  // 그 푸드트럭의 찜 갯수
  likes: null,
  // 그 푸드트럭의 스케줄
  selectedTruckSchedule: [],

  // 트럭 상세조회 요청
  getFoodTruck: async (storeId) => {
    try {
      const response = await axiosInstance.get(`/stores/${storeId}`);
      
      set((state) => ({
        selectedTruck: response.data,
      }));

      return response.data;

    } catch (error) {

      console.error('트럭 가져오는데 실패 했음 ㅠㅜ', error);

    }
  },

  // 트럭 메뉴 조회 요청
  getFoodTruckMenus: async (storeId) => {
    try {

      const response = await axiosInstance.get(`/stores/${storeId}/menus`);
      
      set((state) => ({
        selectedTruckMenus: response.data,
      }));

    } catch (error) {

      console.error('트럭 메뉴 가져오는데 실패 했음 ㅠㅜ', error);

    }
  },

  // 해당 메뉴 상세조회 요청
  getMenuDetail: async (menuId) => {
    try {

      const response = await axiosInstance.get(`/menus/${menuId}`);

      console.log(response.data)

      return response.data

    } catch (error) {

      console.error('메뉴 디테일 못 가져옴 ㅠㅜ' , error)

    }
  },

  // 해당 트럭에 달린 리뷰 리스트 요청
  getFoodTruckReviews: async (storeId) => {
    try {

      const response = await axiosInstance.get(`/reviews/${storeId}`);

      set((state) => ({
        selectedTruckReviews: response.data,
      }));

    } catch (error) {

      console.error('트럭 리뷰를 못 가져옴 ㅠㅜ' , error)

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
  getOpenFoodTruck: async () => {
    try {

      const response = await axiosInstance.get('/stores/open/all');
    
      set((state) => ({
        openFoodTrucks: response.data,
      }));
      
    } catch (error) {

      console.error('못 가져 왔어용', error);

    }
  },

  // 트럭 찜 개수 요청
  getFoodTruckLikes: async (storeId) => {
    try {

      const response = await axiosInstance.get(`favorites/${storeId}`);

      set((state) => ({
        likes: response.data,
      }));

    } catch (error) {

      console.error('찜 개수 조회 실패', error);

      return null;

    }
  },

  // 트럭 찜 하기 함수
  JJimTruck: async (storeId) => {
    try {

      await axiosInstance.post(`favorites/${storeId}`)
      
    } catch (error) {

      console.error('찜 등록 실패' , error);

    }
  },

  // 찜 한 트럭 찜 삭제하기 함수
  unJJimTruck: async (favoriteId) => {
    try {

      await axiosInstance.delete(`favorites/${favoriteId}`)

    } catch (error) {

      console.error('찜 삭제 실패' , error)

    }
  },

  // 트럭 스케줄 조회
  getFoodTruckSchedule: async (storeId) => {
    try {

      const response = await axiosInstance.get(`schedules/${storeId}`); 

      set({ selectedTruckSchedule: response.data });

    } catch (error) {

      console.error('스케줄 불러오기 실패' , error)

    }
  },

}));

export default useFoodTruckStore;
