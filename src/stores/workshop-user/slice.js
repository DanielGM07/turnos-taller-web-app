import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  role: "",
};

export const workshopUserSlice = createSlice({
  name: "workshop_user",
  initialState,
  reducers: {
    setWorkshopUser: (state, action) => {
      state.id = action.payload.id;
      state.role = action.payload.role;
    },
    clearWorkshopUser: (state) => {
      state.id = "";
      state.role = "";
    },
  },
});

export const { setWorkshopUser, clearWorkshopUser } = workshopUserSlice.actions;
export default workshopUserSlice.reducer;
