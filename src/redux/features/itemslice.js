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
const itemSlice = createSlice({
    name: 'item',
    initialState : {
      items: [],
      },
    reducers:{
        getItem: (state, action) => {
          state.items = action.payload;
        },
        createItem: (state, action)=> {
           return{
            ...state,
            items: [
              ...state.items,
              {...action.payload}
            ]
           }
          },
          deleteItem: (state, action) => {
            console.log(action);
            state.items = state.items.filter((item) => item.Products !== action.payload.Products);
            
          },
          updateItem:(state,action)=> {
            return {
              ...state,
              items: handleItem({
                prevItems: state.items,
                addItem: action.payload,
              }),
            };
          },
          resetItem:(state,action)=> {
            state.items = []
          }
    },
})

export const { createItem, deleteItem, updateItem, resetItem } = itemSlice.actions;

export default itemSlice.reducer;