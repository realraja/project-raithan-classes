import { checkUser } from "../actions/userActions";

const { createSlice } = require("@reduxjs/toolkit");



const user = createSlice({name: "user",initialState:{isUser:false},reducers:{
    loginActionUser:(state)=>{
        state.loading = false;
        state.isUser = true;
    },
    logoutActionUser:(state)=>{
        state.loading = false;
        state.isUser = false;
    },
},extraReducers(builder){
    builder
    .addCase(checkUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        // console.log('success==>',state, action)
        state.loading = false;
        state.isUser = true;
        state.message = action.payload.message;
        state.user = action.payload.user;
        state.courses = action.payload.courses;
        state.quizes = action.payload.quizes;
      })
      .addCase(checkUser.rejected, (state, action) => {
        // console.log(action)
          state.loading = false;
          state.isUser = false;
          state.user = null;
          state.courses = null;
          state.quizes = null;
          state.error = action.payload;
      })
}})


export const {loginActionUser,logoutActionUser} =user.actions;

export default user.reducer;