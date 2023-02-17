import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios/axios';

const initialState = {
    TransferProducts: [],
    isLoading: false,
    hasError: false

}
export const retrieveTransferProducts = createAsyncThunk(
    "Transfer/retrieve", async () => {
        try {
            const response = await axios.get('/transfer');
            return response.data.data
        } catch (error) {
            console.log(error);
        }
    }
);

export const postTransferOut = createAsyncThunk(
    "Transfer/post", async (data) => {
        try {
            await axios.post('/transfer', data);
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    }
);


const transferOutSlice = createSlice({
    name: 'Transfer',
    initialState,

    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(retrieveTransferProducts.fulfilled, (state, action) => {
                state.TransferProducts = action.payload;
                state.isLoading = false;
                state.hasError = false
            })

    }
})

const { reducer } = transferOutSlice
export default reducer;
