import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/features/cartSlice.js";
import userReducer from "@/features/userSlice.js";
import appSlice from "@/features/appSlice.js";

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const reducers = combineReducers({
  cart: cartReducer,
  user: userReducer,
  app: appSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
