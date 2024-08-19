import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APP_URL } from "../../main";

const initialState = {
  todos: [],
  status: "idle",
  error: null,
};

export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  const response = await axios.get(`${APP_URL}/todos`);
  console.log("All todos", response);
  return response.data;
});

export const addItem = createAsyncThunk("items/addItem", async (newItem) => {
  const response = await axios.post(`${APP_URL}/store`, newItem);
  console.log("Submit date", response.data.todo)
  return response.data.todo;
});

export const updateItem = createAsyncThunk(
  "items/updateItem",
  async (updatedItem) => {
    const response = await axios.put(
      `http://localhost:5000/items/${updatedItem.id}`,
      updatedItem
    );
    return response.data;
  }
);

export const deleteItem = createAsyncThunk("items/deleteItem", async (id) => {
  await axios.delete(`http://localhost:5000/items/${id}`);
  return id;
});

// eslint-disable-next-line react-refresh/only-export-components
const CreateTodoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  },
});

export default CreateTodoSlice.reducer;
