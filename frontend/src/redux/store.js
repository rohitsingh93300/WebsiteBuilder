// import { configureStore } from "@reduxjs/toolkit";
// import userSlice from "./userSlice"

// const store = configureStore({
//     reducer:{
//      user:userSlice
//     }
// })

// export default store


import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage"; // default (localStorage)
import userSlice from "./userSlice"

const rootReducer = combineReducers({
    user: userSlice,
});


// Configure persistence
const persistConfig = { key: "Dora-ai", version: 1, storage:storage.default };

// Wrap root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // Ignore serializable check for redux-persist actions
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store); //
