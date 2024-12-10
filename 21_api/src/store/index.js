import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './slices/usersSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { albumsApi } from './apis/albumsApi';
import { photosApi } from './apis/photosApi';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    //this left side isn't an array, it's just a way to grab "albums" from albumsApi and make that the key
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(photosApi.middleware);
  },
});

setupListeners(store.dispatch);

//this just means find the file fetchUsers and export everything that is being exported from it.
export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/removeUser';
export {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} from './apis/albumsApi';
export {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation,
} from './apis/photosApi';
