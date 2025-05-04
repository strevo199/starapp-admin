import { createSlice } from '@reduxjs/toolkit';

type User = {
  name: string;
  email: string;
};

type AuthState = {
  user: User | null;
  isAuthecated:boolean;
  loading: boolean;
};

const initialState: AuthState = {
    user: null,
    loading: true,
    isAuthecated: false
};



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthecated=false;
    },
    login(state) {
      state.isAuthecated=true;
    },
  },

});

export const { logout,login } = authSlice.actions;
export default authSlice.reducer;
