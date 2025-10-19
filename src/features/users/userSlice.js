import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"



export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async(_,thunkAPI)=>{
        try{
            const response =await fetch("https://jsonplaceholder.typicode.com/users")
            const data = await response.json();
            return data
        }catch(error){
            return thunkAPI.rejectWithValue("fail to fetch data from api")
        }
    }
)

export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async(id)=>{
        try{
            await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
                {method: "DELETE"}
            )
            return id;
        }catch(error){
            alert (error)
        }
    }
)

export const editUser = createAsyncThunk(
    "users/editUser",
    async({id , data})=>{
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}` , {
            method : "PUT",
            body :JSON.stringify(data),
            headers:{
                "content-type" : "application/json; charset=UTF-8"
            }
        })
        return response.json();
    }
)



const initialState = {
    users:[],
    loading:false,
    error:null
}

const userSlice = createSlice({
    name : "users",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUsers.pending, (state)=>{
            state.loading = true;
            state.error = null
        })
        .addCase(fetchUsers.fulfilled , (state , action)=>{
            state.loading = false
            state.users = action.payload
        })
        .addCase(fetchUsers.rejected , (state , action)=>{
            state.loading = false;
            state.error = action.payload
        })
        .addCase(deleteUser.fulfilled , (state,action)=>{
            state.users = state.users.filter(user=>user.id!==action.payload)
        })
        .addCase(editUser.fulfilled , (state,action)=>{
            state.users = state.users.map(user => user.id === action.payload.id ? action.payload : user)
        })
    }
})

export default userSlice.reducer