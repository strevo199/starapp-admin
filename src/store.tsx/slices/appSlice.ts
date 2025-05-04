import { createSlice } from "@reduxjs/toolkit";

export type HymmListype = {
    title: string;
    _id: string;
    hymm_number: string;
    content: string;
    chorus: string;
    verses: { label: string; value: string }[];
    status: string;
    language: string;
    createdAt: string;
    updatedAt: string;
  }[];
type AuthState = {
  hymmlist: HymmListype;
};

const initialState: AuthState = {
  hymmlist: []
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    savehymmlist(state, { payload }) {
      state.hymmlist = payload;
    },
  },
});

export const { savehymmlist } = appSlice.actions;
export default appSlice.reducer;
