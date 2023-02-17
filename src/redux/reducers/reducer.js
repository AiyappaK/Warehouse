import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios/axios';

const initialState = {
  Products: [],
  isLoading:false,
    hasError: false

}
export const retrieveProducts = createAsyncThunk(
    "product/retrieve",async()=>{
        try {
            const response = await axios.get('/product');
            return response.data.data
        } catch (error) {
            console.log(error);
        }
    }
  );

export const postProducts = createAsyncThunk(
    "product/post",async(data)=>{
        try {
            await axios.post('/inventory',data);
            console.log(data);
            
        } catch (error) {
            console.log(error);
        }
    }
  );


const productSlice = createSlice({
  name: 'products',
  initialState,

  reducers:{

  },
  extraReducers: (builder)=>{
        builder
        .addCase(retrieveProducts.fulfilled,(state,action)=>{
            state. Products = action.payload;
            state.isLoading = false;
            state.hasError = false
        })
       
    }
})

const {reducer} = productSlice
export default reducer;
