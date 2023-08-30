import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers=createAsyncThunk("getUsers",async(body,thunkApi)=>{
    try{
        let response=await axios.post(body.url,body.payload)
        let userList=response.data
        if(userList!=[] &&userList.message!=null){
            alert(userList.message)
            return thunkApi.rejectWithValue(userList.message)
        }
        return userList
    }
    catch(err){
        return thunkApi.rejectWithValue("Unable to fetch data")
    }
})


export const userApi=createSlice({

    name:"users",
    initialState:{"users":[],isSuccess:false,isPending:false,isError:false,errorMessage:''},
    reducers:{
        logout:(state,action)=>{
            state.users=[]
            state.isSuccess=false
            state.isPending=false
            state.isError=false
            state.errorMessage=''}
    },
    extraReducers:{
        [fetchUsers.pending]:(state,action)=>{
            state.isPending=true;
            state.isError=false;
            state.errorMessage='';
            state.isSuccess=false;
        },
        [fetchUsers.fulfilled]:(state,action)=>{
            state.users=action.payload;
            state.isPending=false;
            state.isError=false;
            state.errorMessage='';
            state.isSuccess=true;
        },
        [fetchUsers.rejected]:(state,action)=>{
            state.isError=true;
            state.errorMessage=action.payload;
            state.users=[];
            state.isSuccess=false;
        },
    }
})
export const {logout}=userApi.actions
export default userApi.reducer