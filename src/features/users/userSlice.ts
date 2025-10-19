import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


interface User {
  id: number;
  name: string;
  email: string;
  [key: string]: any;
}


interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};


export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch users");
    }
  }
);


export const deleteUser = createAsyncThunk<number, number>(
  "users/deleteUser",
  async (id, thunkAPI) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "DELETE",
      });
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to delete user");
    }
  }
);

interface EditUserPayload {
  id: number;
  data: Partial<User>;
}

export const editUser = createAsyncThunk<User, EditUserPayload>(
  "users/editUser",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      );
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to edit user");
    }
  }
);


const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
   
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      
      .addCase(editUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
      });
  },
});

export default userSlice.reducer;
