import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categories/categorySlice'
import commonReducer from './common/commonSlice'
import cartReducer from './carts/cartSlice'
import bannerReducer from './banners/bannerSlice';
import productReducer from './products/productSlice'
import gatewayReducer from './gateway/gatewaySlice'

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    common: commonReducer,
    cart: cartReducer,
    product: productReducer,
    gateway: gatewayReducer,
    banner: bannerReducer
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
