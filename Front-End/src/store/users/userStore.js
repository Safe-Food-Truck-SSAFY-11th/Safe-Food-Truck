import axios from 'utils/axiosInstance';
import { create } from 'zustand';

const userStore = create((set, get) => ({
  isGuest: null, // 초기 상태는 null
  setGuest: () => set({ isGuest: true }),
  setOwner: () => set({ isGuest: false }),

  loginUser: async (email, password) => {
    try {
      const response = await axios.post('members/login', { email, password });
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
      const response = await axios.get('members');
      sessionStorage.setItem('email', response.data.email);
      sessionStorage.setItem('role', response.data.role);
      sessionStorage.setItem('nickname', response.data.nickname);
      set({ user: response.data });
      return response.data;
    } catch (error) {
      console.error('사용자 정보 가져오기 오류:', error);
      set({ user: null, isAuthenticated: false });
      throw error;
    }
  },

  registerUser: async (method, userData) => {
    try {
      const response = await axios.post(`members/${method}`, userData);
      return response.data;
    } catch (error) {
      console.error('회원가입 오류:', error);
      throw error;
    }
  },

  emailChecked: null, // 이메일 확인 상태 (null, Possible, Duplicate)
  nicknameChecked: null, // 닉네임 확인 상태 (null, Possible, Duplicate)
  passwordMatch: null, // 비밀번호 일치 여부 (null, true, false)
  emailTouched: false, // 이메일 입력 상태
  nicknameTouched: false, // 닉네임 입력 상태
  passwordTouched: false, // 비밀번호확인 입력 상태

  checkEmail: async (email) => {
    try {
      const response = await axios.get(`members/duplication-email/${email}`);
      set({ emailChecked: response.data });
    } catch (error) {
      console.error('이메일 중복 확인 오류:', error);
      set({ emailChecked: false });
    }
  },

  checkNickname: async (nickname) => {
    try {
      const response = await axios.get(`members/duplication-nickname/${nickname}`);
      set({ nicknameChecked: response.data });
    } catch (error) {
      console.error('닉네임 중복 확인 오류:', error);
      set({ nicknameChecked: false });
    }
  },

  setEmailTouched: () => set({ emailTouched: true }),
  setNicknameTouched: () => set({ nicknameTouched: true }),
  setPasswordTouched: () => set({ passwordTouched: true }),
  setPasswordMatch: (match) => set({ passwordMatch: match }),

  updateUser: async (form) => {
    try {
      const response = axios.patch('members/modify', form);
      await sessionStorage.setItem('nickname', form.nickname);
      return response.data;
    } catch (error) {
      console.error('회원 정보 수정 오류:', error);
      throw error;
    }
  }
}));

export default userStore;
