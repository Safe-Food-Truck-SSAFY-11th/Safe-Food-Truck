import { create } from "zustand";

const useMenuStore = create((set) => ({
  isOpen: false,
  menus: [],
  openMenu: () => set({ isOpen: true }),
  closeMenu: () => set({ isOpen: false }),
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
    set((state) => ({
      menus: [...state.menus, state.menuForm],
      menuForm: { menuName: "", price: "", description: "", image: null },
    })),
  removeMenu: (index) =>
    set((state) => ({
      menus: state.menus.filter((_, i) => i !== index),
    })),
}));

export default useMenuStore;
