import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timestamp: null,
  search: "",
  avatarProps: {},
  avatar: "",
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setTimestamp: (state, action) => {
      const { payload } = action;
      state.timestamp = payload;
    },
    setSearch: (state, action) => {
      const { payload } = action;
      state.search = payload;
    },
    setAvatarProps: (state, action) => {
      const { payload } = action;
      state.avatarProps = payload;
    },
    setAvatar: (state, action) => {
      const { payload } = action;
      state.avatar = payload;
    }
  },
});

export const { setTimestamp, setSearch, setAvatarProps, setAvatar } = dataSlice.actions;

export default dataSlice.reducer;
