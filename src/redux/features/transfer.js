import { createSlice } from '@reduxjs/toolkit'


export const handleItem = ({prevItems,addItem,
}) => {
  const existingItem = prevItems.find(
    (Item) => Item.Products === addItem.Products
  );

  return prevItems.map((Item) =>
    Item.Products === existingItem.Products
      ? {
          ...Item,
          quantity: addItem.quantity,
          discount: addItem.discount,
          itemMsp: addItem.itemMsp,
          itemMrp: addItem.itemMrp,
          itemGst: addItem.itemGst,
        }
      : Item,
  );
};
const TransferItemSlice = createSlice({
    name: 'AddTransfer',
    initialState : {
      TransferItems: [],
      },
    reducers:{
        getItem: (state, action) => {
          state.TransferItems = action.payload;
        },
        createTransferItem: (state, action)=> {
           return{
            ...state,
            TransferItems: [
              ...state.TransferItems,
              {...action.payload}
            ]
           }
          },
          deleteTransferItem: (state, action) => {
            console.log(action);
            state.TransferItems = state.TransferItems.filter((item) => item.Products !== action.payload.Products);
            
          },
          updateTransferItem:(state,action)=> {
            return {
              ...state,
              TransferItems: handleItem({
                prevTransferItems: state.TransferItems,
                addItem: action.payload,
              }),
            };
          },
          resetTransferItem:(state,action)=> {
            state.TransferItems = []
          }
    },
})

export const { createTransferItem, deleteTransferItem, updateTransferItem, resetTransferItem } = TransferItemSlice.actions;

export default TransferItemSlice.reducer;