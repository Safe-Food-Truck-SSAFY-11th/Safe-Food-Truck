import { create } from 'zustand';
import axiosInstance from 'utils/axiosInstance';

const customerStore = create((set, get) => ({
  form: {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    nickname: '',
    gender: '',
    birthdate: '',
    phone: '',
  },
  passwordMatch: null, // 비밀번호 일치 여부 상태
  emailTouched: false, // 이메일 입력 상태
  passwordTouched: false, // 비밀번호 확인 입력 상태
  nicknameChecked: false, // 닉네임 확인 상태
  nicknameTouched: false, // 닉네임 입력 상태
  memberInfo: null, // 회원 정보 상태 추가
  setForm: (name, value) => {
    const updatedForm = { ...get().form, [name]: value };
    const passwordMatch = updatedForm.password === updatedForm.confirmPassword;
    set({ form: updatedForm, passwordMatch });
  },
  checkEmail: () => set({ emailChecked: true }),
  setEmailTouched: () => set({ emailTouched: true }),
  setPasswordTouched: () => set({ passwordTouched: true }),
  checkNickname: () => set({ nicknameChecked: true }), // 닉네임 확인 함수 추가
  setNicknameTouched: () => set({ nicknameTouched: true }), // 닉네임 입력 함수 추가


  getMemberInfo: async () => { // 회원 정보 가져오는 함수
    try {

      const response = await axiosInstance.get('members')

      set({ memberInfo: response.data });

    } catch (error) {

      console.error('회원 정보 가져오기 실패', error);  

    }
  },

  modifyMemberInfo: async (updateData) => { // 회원 정보 수정하는
    try {

      const response = await axiosInstance.patch('members/modify', updateData)

      set({ memberInfo: response.data });

    } catch (error) {

      console.error('회원 정보 수정하기 실패', error);
      
    }
  },


}));

export default customerStore;
