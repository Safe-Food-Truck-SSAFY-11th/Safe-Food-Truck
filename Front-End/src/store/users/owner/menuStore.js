import { create } from "zustand";

const useMenuStore = create((set) => ({
  isUpdateOpen: false,
  isRegistOpen: false,
  isDeleteOpen: false,
  menus: [],
  openUpdate: () => set({ isUpdateOpen: true }),
  closeUpdate: () => set({ isUpdateOpen: false }),
  openRegist: () => set({ isRegistOpen: true }),
  closeRegist: () => set({ isRegistOpen: false }),
  openDelete: () => set({ isDeleteOpen: true }),
  closeDelete: () => set({ isDeleteOpen: false }),
  menuForm: {
    menuName: "",
    price: "",
    description: "",
    image: null,
  },
  setMenuForm: (name, value) =>
    set((state) => ({
      menuForm: { ...state.menuForm, [name]: value },
    })),
  setMenuImage: (image) =>
    set((state) => ({
      menuForm: { ...state.menuForm, image },
    })),
  addMenu: () =>
    //axios 요청 추가
    set((state) => ({
      menus: [...state.menus, state.menuForm],
      menuForm: { menuName: "", price: "", description: "", image: null },
    })),
  removeMenu: (
    index //axios 요청 추가
  ) =>
    set((state) => ({
      menus: state.menus.filter((_, i) => i !== index),
    })),

  //updateMenu 추가
}));

export default useMenuStore;
