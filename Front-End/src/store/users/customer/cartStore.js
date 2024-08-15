import create from 'zustand';

const useCartStore = create((set) => ({
  cartItems: [],
  setCartItems: (items) => set({ cartItems: items }),
  addItemToCart: (item) => set((state) => ({
    cartItems: [...state.cartItems, item],
  })),
  removeItemFromCart: (itemId) => set((state) => ({
    cartItems: state.cartItems.filter(item => item.id !== itemId),
  })),
  updateItemQuantity: (itemId, quantity) => set((state) => ({
    cartItems: state.cartItems.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    ),
  })),
  clearCart: () => set({ cartItems: [] }),
}));

export default useCartStore;
