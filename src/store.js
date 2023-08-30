
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'
let persistConfig={
   key:'root',
    storage,
}
let rootReducer=combineReducers({
    users:userReducer
})
let persistedReducer=persistReducer(persistConfig,rootReducer)
export const store=configureStore({
reducer:persistedReducer
})