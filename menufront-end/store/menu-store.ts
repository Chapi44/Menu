import { configureStore } from "@reduxjs/toolkit";
import { menuApi } from "@/features/menu/api/menu-api";
import menuReducer from "@/features/menu/slice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    [menuApi.reducerPath]: menuApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(menuApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
