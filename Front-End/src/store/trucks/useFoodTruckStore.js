// src/store/foodTruckStore.js

// 일반 코드

import {create} from 'zustand';
import axios from 'axios';

const useFoodTruckStore = create((set) => ({
  foodTrucks: [],

  // 트럭 등록 요청
  addFoodTruck: async (newTruck) => {
    const response = await axios.post('/api/foodtrucks', newTruck);
    set((state) => ({
      foodTrucks: [...state.foodTrucks, response.data],
    }));
  },

  // 트럭 상세조회 요청
  getFoodTruck: async (id) => {
    const response = await axios.get(`/api/foodtrucks/${id}`);
    set((state) => ({
      selectedTruck: response.data,
    }));
  },

  // 트럭 목록 조회 요청
  fetchFoodTrucks: async () => {
    const response = await axios.get('/api/foodtrucks');
    set({ foodTrucks: response.data });
  },

  // 트럭 정보 수정 요청
  updateFoodTruck: async (updatedTruck) => {
    const response = await axios.put(`/api/foodtrucks/${updatedTruck.id}`, updatedTruck);
    set((state) => ({
      foodTrucks: state.foodTrucks.map(truck =>
        truck.id === updatedTruck.id ? response.data : truck
      ),
    }));
  },

  // 트럭 삭제 요청
  deleteFoodTruck: async (id) => {
    await axios.delete(`/api/foodtrucks/${id}`);
    set((state) => ({
      foodTrucks: state.foodTrucks.filter(truck => truck.id !== id),
    }));
  },
}));

export default useFoodTruckStore;


// src/store/trucks/foodTruckStore.js

// json-server용 테스트 코드
// src/store/foodTruckStore.js

// src/store/foodTruckStore.js
