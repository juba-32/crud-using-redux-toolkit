import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./TodoSlice";

const Store = configureStore({
  reducer: {
    tasks: todoReducer, 
  },
});

export default Store;