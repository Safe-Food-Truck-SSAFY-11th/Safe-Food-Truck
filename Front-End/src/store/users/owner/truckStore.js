import { create } from 'zustand';

const useTruckStore = create((set) => ({
  form: {
    storeName: '',
    category: '',
    menu: '',
    workingDays: [],
    description: '',
    image: null,
  },
  setForm: (name, value) => set((state) => ({
    form: { ...state.form, [name]: value },
  })),
  setImage: (image) => set((state) => ({
    form: { ...state.form, image },
  })),
  toggleWorkingDay: (day) => set((state) => ({
    form: {
      ...state.form,
      workingDays: state.form.workingDays.includes(day)
        ? state.form.workingDays.filter((d) => d !== day)
        : [...state.form.workingDays, day],
    },
  })),
}));

export default useTruckStore;
