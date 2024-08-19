import { configureStore } from "@reduxjs/toolkit";
import CreateTodoReducer from "../features/create_todo/CreateTodoSlice";
// import itemsReducer from "./features/items/itemsSlice";

export const store = configureStore({
  reducer: {
    // items: itemsReducer,
    todos: CreateTodoReducer
  },
});
