import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = 'http://127.0.0.1:3000/api';

const initialState = {
  categories: [],
  products: [],
  images: [],
  status: 'idle',
  isLoading: false,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ url, categoryName }) => {
    try {
      // Step 1: Send the URL to scrape and store data
      await fetch(`${baseUrl}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      // Step 2: Fetch products by category after storing data
      const response = await fetch(`${baseUrl}/categories/${categoryName}`);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error fetching and storing data:', error);
    }
  },
);

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchProducts.pending, (state) => ({ 
          ...state,
          isLoading: true,
          status: 'Scraping the data, please wait...',
        }))
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