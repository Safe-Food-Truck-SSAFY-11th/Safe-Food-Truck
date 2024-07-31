import axios from 'axios';
import { create } from 'zustand';

const userStore = create((set, get) => ({
  isGuest: null, // 초기 상태는 null
  setGuest: () => set({ isGuest: true }),
  setOwner: () => set({ isGuest: false }),

  loginUser: async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8080/api/members/login', { email, password });
      const token = response.data;
      sessionStorage.setItem('token', token); // 토큰을 세션 스토리지에 저장
      set({ isAuthenticated: true });
      await get().fetchUser();
      return get().user;
    } catch (error) {
      console.error('로그인 오류:', error);
      set({ isAuthenticated: false });
      throw error;
    }
  },

  fetchUser: async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/members', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      sessionStorage.setItem('email', response.data.email);
      set({ user: response.data });
    } catch (error) {
      console.error('사용자 정보 가져오기 오류:', error);
      set({ user: null, isAuthenticated: false });
    }
  },
}));

export default userStore;
