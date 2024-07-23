import { create } from 'zustand';

const useCustomerStore = create((set, get) => ({
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
}));

export default useCustomerStore;
