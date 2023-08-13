import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = 'http://127.0.0.1:3000/api';

const initialState = {
  categories: [],
  products: [],
  images: [],
  status: 'idle',
  isLoading: true,
};

export const fetchScraperData = createAsyncThunk(
    'products/fetchScraperData',
    async ({ url }) => {
        try {
            const response = await fetch(`${baseUrl}/products`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(url),
            });
            const data = await response.json();
            return data;
          } catch (error) {
            console.error('Error storing scraped data:', error);
          }
    },
);

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (name) => {
    try {
        const response = await fetch(`${baseUrl}/categories/${name}`);
          const data = await response.json();
          return data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  },
);

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchScraperData.pending, (state) => ({ ...state, isLoading: true }))
        .addCase(fetchScraperData.fulfilled, (state, action) => ({
          ...state,
          isLoading: false,
          status: action.payload.message,
        }))
        .addCase(fetchScraperData.rejected, (state, action) => ({ 
          ...state,
          isLoading: false,
          status: action.payload.message,
        }))
        .addCase(fetchProducts.pending, (state) => ({ ...state, isLoading: true }))
        .addCase(fetchProducts.fulfilled, (state, action) => ({
          ...state,
          isLoading: false,
          categories: action.payload.category,
          products: action.payload.product,
          images: action.payload.image,
        }))
        .addCase(fetchProducts.rejected, (state, action) => ({ 
          ...state,
          isLoading: false,
          status: action.payload.message,
        }))
    },
  });
  
  export default productSlice.reducer;