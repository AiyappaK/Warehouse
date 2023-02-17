import { configureStore } from '@reduxjs/toolkit'
import  productSlice  from './reducers/reducer'
import  transferOutSlice  from './reducers/transferOut'
import  itemSlice  from './features/itemslice'
import  TransferItemSlice  from './features/transfer'

export const store = configureStore({
  reducer: {
    products: productSlice,
    item:itemSlice,
    Transfer:transferOutSlice,
    AddTransfer:TransferItemSlice
},
})