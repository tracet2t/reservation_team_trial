import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APP_URL } from "../../main";
import { axiosInstance } from "../../api/axiosInstance";

const initialState = {
  todos: [],
  status: "idle",
  error: null,
};

export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  const response = await axiosInstance.get("/todos"); // Use relative path since baseURL is set
  return response.data;
});

export const addItem = createAsyncThunk("items/addItem", async (newItem, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/store", newItem);
    console.log("Submitted data", response.data.todo);
    return response.data.todo;
  } catch (error) {
    if (!error.response) {
      // Handle server down or network error
      return rejectWithValue("Server is down or network error. Please try again later.");
    } else {
      // Handle other errors (e.g., validation errors)
      return rejectWithValue(error.response.data.message || "An error occurred.");
    }
  }
});

export const updateItem = createAsyncThunk(
  "items/updateItem",
  async (updatedItem) => {
    const response = await axios.put(
      `${APP_URL}/todos/${updatedItem.id}`,
      updatedItem
    );
    return response.data.todo;
  }
);

export const deleteItem = createAsyncThunk("items/deleteItem", async (id) => {
  await axios.delete(`${APP_URL}/todos/${id}`);
  return id; // Return the id of the deleted item
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
        state.status = "succeeded"
        const index = state.todos.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = state.todos.filter((item) => item.id !== action.payload);
      });
  },
});

export default CreateTodoSlice.reducer;
