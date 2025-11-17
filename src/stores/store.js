import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { baseApi } from "../apis/base.api.js";
import workshopUserReducer from "./workshop-user/slice.js";

const persistConfig = {
  key: "workshop_root",
  storage,
  whitelist: ["workshop_user"],
};

const rootReducer = combineReducers({
  workshop_user: workshopUserReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export default store;
