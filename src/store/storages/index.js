import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import rootReducer from "../reducers";

const persistConfig = {
    key: "redux", // id untuk local storage
    storage: AsyncStorage, // local storage yang dipakai
    whitelist: ["dataCount", "dataLogin"], // list data yang perlu di simpan dan tidak terhapus
    blacklist: [], // list data yang tidak perlu disimpan(optional).
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})
export const persistor = persistStore(store);

// Async Storage React Native
export const storeData = async (key, value) => {
    try {
        console.log("STORE DATA", JSON.stringify(value));
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        // saving error
        console.log("ERROR SET STORAGE", e);
    }
};

export const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
        console.log("ERROR GET STORAGE");
    }
};

export const deleteData = async (key) => {
    try{
        await AsyncStorage.removeItem(key);
    }catch(e) {
        console.log("ERROR DELETE STORAGE");
    }
}
