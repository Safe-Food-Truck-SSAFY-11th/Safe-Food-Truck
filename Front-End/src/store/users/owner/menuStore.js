import { create } from "zustand";
import axiosInstance from "utils/axiosInstance"; // axiosInstance 파일의 경로에 맞게 수정

const useMenuStore = create((set) => ({
  isUpdateOpen: false,
  isRegistOpen: false,
  isDeleteOpen: false,
  menus: [],
  closeUpdate: () => set({ isUpdateOpen: false }),
  openRegist: () => set({ isRegistOpen: true }),
  closeRegist: () => set({ isRegistOpen: false }),
  openDelete: () => set({ isDeleteOpen: true }),
  closeDelete: () => set({ isDeleteOpen: false }),
  menuForm: {
    menuId: -1,
    name: "",
    price: "",
    description: "",
    savedUrl: "",
    savedPath: ""
  },
  setMenuForm: (name, value) =>
    set((state) => ({
      menuForm: { ...state.menuForm, [name]: value },
    })),
  setMenuImage: (image) =>
    set((state) => ({
      menuForm: { ...state.menuForm, image },
    })),

  openUpdate: (menu) => {
    console.log(menu);
    set({
      isUpdateOpen: true,
      menuForm: {
        menuId: menu.menuId,
        name: menu.name,
        price: menu.price,
        description: menu.description,
        savedUrl: menu.savedUrl,
        savedPath: menu.savedpath
      },
    });
  },

  // 메뉴 등록 요청
  addMenu: async () => {
    // set의 콜백을 사용하여 상태를 가져옵니다.
    set(async (state) => {
      try {
        // 요청 양식 생성
        const requestBody = {
          menuRegistRequestDtos: [
            {
              name: state.menuForm.name,
              price: state.menuForm.price,
              description: state.menuForm.description,
              menuImageDto: {
                savedUrl: state.menuForm.savedUrl,
                savedPath: state.menuForm.savedPath
              }
            },
          ],
        };
        
        console.log("메뉴가 잘 추가하려고 시도 하나요?", requestBody);

        // POST 요청을 통해 메뉴 추가
        const response = await axiosInstance.post("/menus", requestBody);

        // 요청이 성공하면 상태 업데이트
        console.log("메뉴추가 성공");
        return {
          menus: [...state.menus, response.data], // 서버에서 받은 응답을 menus에 추가
          menuForm: { menuName: "", price: "", description: "", savedPath: "", savedUrl: "" }, // 폼 초기화
        };
      } catch (error) {
        console.error("메뉴 추가에 실패 ㅠㅜ", error);
        return state; // 상태를 그대로 반환
      }
    });
  },

  // 메뉴 수정 요청
  updateMenu: async (menuId) => {
    console.log("여기왔어요");
    // set의 콜백을 사용하여 상태를 가져옵니다.
    set(async (state) => {
      try {
        // 요청 양식 생성
        const requestBody = {
          name: state.menuForm.name,
          price: state.menuForm.price,
          description: state.menuForm.description,
          menuImageDto: {
            savedUrl: state.menuForm.savedUrl,
            savedPath: state.menuForm.savedPath
          }
        };

        // PATCH 요청을 통해 메뉴 수정
        const response = await axiosInstance.patch(
          `/menus/${menuId}`, // URL에 슬래시 추가
          requestBody
        );

        // 요청이 성공하면 상태 업데이트
        console.log("메뉴 수정 성공");

        // 기존 menus에서 수정된 메뉴를 찾아 업데이트
        const updatedMenus = state.menus.map((menu) =>
          menu.menuId === menuId ? response.data : menu
        );

        return {
          menus: updatedMenus, // 수정된 메뉴로 업데이트
          menuForm: { menuId: -1, menuName: "", price: "", description: "" }, // 폼 초기화
        };
      } catch (error) {
        console.error("메뉴 수정 실패 ㅠㅜ", error);
        return state; // 상태를 그대로 반환
      }
    });
  },

  // 메뉴 삭제 요청
  removeMenu: async (menuId) => {
    console.log("메뉴 삭제 요청", menuId);
    // set의 콜백을 사용하여 상태를 가져옵니다.
    set(async (state) => {
      try {
        // DELETE 요청을 통해 메뉴 삭제
        await axiosInstance.delete(`/menus/${menuId}`);

        // 요청이 성공하면 상태 업데이트
        console.log("메뉴 삭제 성공");

        // 기존 menus에서 삭제된 메뉴를 제외한 새로운 배열 생성
        const updatedMenus = state.menus.filter(
          (menu) => menu.menuId !== menuId
        );

        return {
          menus: updatedMenus, // 삭제된 메뉴를 제외한 배열로 업데이트
        };
      } catch (error) {
        console.error("메뉴 삭제 실패 ㅠㅜ", error);
        return state; // 상태를 그대로 반환
      }
    });
  },

  // 메뉴 로딩
  fetchMenu: async () => {
    const response = await axiosInstance.get("/stores");
    console.log("지금 막 가져온 메뉴 데이터 확인 ~ ", response.data);
    const updatedMenus = response.data.menuListResponseDto.menuResponseDtos.map(
      (menu) => ({
        menuId: menu.menuId,
        name: menu.name,
        price: menu.price,
        description: menu.description,
        menuImageDto: {
          savedUrl: menu.menuImageDto.savedUrl,
          savedPath: menu.menuImageDto.savedPath
        }
      })
    );
    set({ menus: updatedMenus }); // 상태 업데이트
  },
}));

export default useMenuStore;
