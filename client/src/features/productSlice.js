import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: { items: [], totalItems: 0 },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload.items.products;
      state.totalItems = action.payload.items.totalItems;
    },
    addProduct: (state, action) => {
      state.items.unshift(action.payload);
      state.totalItems += 1;
    },
    editProduct: (state, action) => {
      const { productId, updatedProduct } = action.payload;
      const existingProductIndex = state.items.findIndex(
        (product) => product.id === productId
      );

      if (existingProductIndex !== -1) {
        state.items[existingProductIndex] = updatedProduct;
      }
    },
    deleteProduct: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((product) => product.id !== productId);
    },
  },
});

export const { setProducts, addProduct, editProduct, deleteProduct } =
  productSlice.actions;

export default productSlice.reducer;
