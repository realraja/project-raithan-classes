const { createSlice } = require("@reduxjs/toolkit");
const { checkAdmin, adminLogin } = require("../actions/adminActions");



const admin = createSlice({name: "admin",initialState:{isAdmin:false},reducers:{
    loginAction:(state)=>{
        state.loading = false;
        state.isAdmin = true;
    },
    logoutAction:(state)=>{
        state.loading = false;
        state.isAdmin = false;
    },
},extraReducers(builder){
    builder
          .addCase(checkAdmin.pending, (state, action) => {
            // console.log('pending==>',state, action)
            state.loading = true;
          })
          .addCase(checkAdmin.fulfilled, (state, action) => {
            // console.log('success==>',state, action)
            state.loading = false;
            state.isAdmin = true;
            state.message = action.payload.message;
          })
          .addCase(checkAdmin.rejected, (state, action) => {
            // console.log(action)
              state.loading = false;
              state.isAdmin = false;
              state.error = action.payload;
          })
}})


export const {loginAction,logoutAction} =admin.actions;

export default admin.reducer;