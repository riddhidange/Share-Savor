import { createSlice, current } from "@reduxjs/toolkit";

let initialState = {
  value: {
    restaurant: {
      data: {},
      cart: [],
      order: null,
    },
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let { toast, mealPack, ...rest } = action?.payload;

      if (
        state.value.restaurant.cart.filter((item) => item.id === mealPack.id)
          .length > 0
      ) {
        return;
      }

      state.value.restaurant.data = rest;
      state.value.restaurant.cart.push({ ...mealPack, resId: rest._id });
      let order = {
        ...rest,
        cart: state.value.restaurant.cart,
      };
      state.value.restaurant.order = order;
      toast({
        title: "Added to cart",
        description: `${
          mealPack.size.charAt(0).toUpperCase() + mealPack.size.slice(1)
        } meal pack added to cart.`,
        status: "success",
        duration: 2500,
      });
    },
    removeFromCart: (state, action) => {
      let { toast, mealPack, ...rest } = action?.payload;
      state.value.restaurant.cart = state.value.restaurant.cart.filter(
        (item) => item.id !== mealPack.id,
      );
      toast({
        title: "Removed from cart",
        description: `${
          mealPack.size.charAt(0).toUpperCase() + mealPack.size.slice(1)
        } meal pack removed from the cart.`,
        status: "success",
        duration: 2500,
      });
    },
    clearCart: (state) => {
      state.value = {
        restaurant: {
          data: {},
          cart: [],
          order: null,
        },
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
