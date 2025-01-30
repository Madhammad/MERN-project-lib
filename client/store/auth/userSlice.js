import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  token: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    signIn: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload.user;
      state.token = action.payload.token
      state.error = null;
    },

   
    signOut: (state) => {
      state.loading = false;
      state.currentUser = null;
      state.token = null;
      state.error = null;
    },


    update: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },

  },
});

export const {
  signIn,
  signInFail,
  signInStart,
  signOut,
  signOutFail,
  signOutStart,
  update,
  updateStart,
  updateFail,
} = userSlice.actions;

export default userSlice.reducer;
