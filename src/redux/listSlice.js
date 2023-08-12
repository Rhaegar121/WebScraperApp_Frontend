import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  lists: [],
  status: 'idle',
  isLoading: true,
};

export const fetchLists = createAsyncThunk(
  'lists/fetchLists',
  async () => {
    const response = await fetch();
    const data = await response.json();
    return data;
  },
);

const listSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchLists.pending, (state) => ({ ...state, isLoading: true }))
        .addCase(fetchLists.fulfilled, (state, action) => ({
          ...state,
          isLoading: false,
          lists: action.payload,
        }))
        .addCase(fetchLists.rejected, (state) => ({ ...state, isLoading: false }))
    },
  });
  
  export default listSlice.reducer;