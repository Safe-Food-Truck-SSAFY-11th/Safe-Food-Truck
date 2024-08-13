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
    memberImage : {
      savedUrl: 'empty',
      savedPath: 'empty'
    }
  },

  // 비밀번호 일치 여부 상태
  passwordMatch: null,
  // 이메일 입력 상태
  emailTouched: false, 
  // 비밀번호 확인 입력 상태
  passwordTouched: false,
  // 닉네임 확인 상태 
  nicknameChecked: false,
  // 닉네임 입력 상태 
  nicknameTouched: false,
  // 회원 정보 상태 추가 
  memberInfo: null,
  // 내가 찜한 트럭 반환 받을 배열 추가 
  myJJimTrucks: [],
  // 내 소비패턴 객체 추가
  mySobiPattern: null,

  myNotification: [],


  setForm: (name, value) => {
    const updatedForm = { ...get().form, [name]: value };
    const passwordMatch = updatedForm.password === updatedForm.confirmPassword;
    set({ form: updatedForm, passwordMatch });
  },

  checkEmail: () => set({ emailChecked: true }),
  setEmailTouched: () => set({ emailTouched: true }),
  setPasswordTouched: () => set({ passwordTouched: true }),
  
  checkNickname: async (nickname) => {
    try {
      const response = await axiosInstance.get(`members/duplication-nickname/${nickname}`);
      set({ nicknameChecked: response.data });
    } catch (error) {
      console.error('닉네임 중복 확인 오류:', error);
      set({ nicknameChecked: false });
    }
  },
  setNicknameTouched: () => set({ nicknameTouched: true }),


   // 회원 정보 가져오는 함수
  getMemberInfo: async () => {
    try {

      const response = await axiosInstance.get('members')

      set({ memberInfo: response.data });

      return response.data;
    } catch (error) {

      console.error('회원 정보 가져오기 실패', error);  

    }
  },


  // 알림 가져오는 함수
  getNotification: async () => {
    try {

      const response = await axiosInstance.get('notifications')

      set({ myNotification : response.data});
  
    } catch (error) {

      console.error('못 가져옴' , error);

    }
  },


  // 회원 정보 수정하는 함수
  modifyMemberInfo: async (updateData) => { 
    try {

      const response = await axiosInstance.patch('members/modify', updateData)
      await sessionStorage.setItem('nickname', updateData.nickname);
      set({ memberInfo: response.data });

    } catch (error) {

      console.error('회원 정보 수정하기 실패', error);
      
    }
  },

  // 내가 찜한 푸드트럭 전부 가져오는 함수
  getJJimTrucks: async () => { 
    try {

      const response = await axiosInstance.get('favorites')

      set({myJJimTrucks : response.data})
   
    } catch (error) {

      console.error('찜 푸드트럭 가져오기 실패' , error)
      
    }
  },

  // 특정 트럭이 찜 한 트럭인지 확인하는 함수
  getJJimTruck: async(storeId) => {

    try { 

    const response = await axiosInstance.get(`favorites/my/${storeId}`)
      
    return response.data;

    } catch (error) {

      console.error('찜 트럭 가져오기 실패' , error)

    }
  },

  // 소비 패턴 데이터 가져오는 함수
  getSobiPattern: async () => {
    try {

      const response = await axiosInstance.get('orders/customers/pattern')

      set({mySobiPattern : response.data})

    } catch (error) {

      console.error('소비패턴 못 가져옴' , error)

    }
  }


}));

export default customerStore;
